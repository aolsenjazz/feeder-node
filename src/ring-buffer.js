class RingBuffer {
	/**
	 * Constructor
	 *
	 * @param { Number } bufferLength Array length (per channel). Extended if a large chunk is submitted to eed()
	 * @param { Number } nChannels    The number of channels. 0 < nChannel < "infinity"
	 */
	constructor(bufferLength = 32768, nChannels = 2) {
		if (bufferLength <= 0) throw "bufferLength must be >= 1";
		if (nChannels < 1) throw "nChannels must >= 1";

		this._data = new Float32Array(bufferLength * nChannels);

		this._nChannels = nChannels;
		this._readPos = 0;
		this._writePos = 0;
	}

	get bufferLength() {
		return this._data.length / this._nChannels;
	}

	/**
	 * Returns the number of samples available. This number is per channel, not summed over the channels
	 *
	 * @return { Number } The number of available samples per channel
	 */
	getNReadableSamples() {
		if (this._readPos == this._writePos) return 0;

		let nInterleavedReadable;
		if (this._readPos < this._writePos) {
			// Read position is lower
			nInterleavedReadable = this._writePos - this._readPos;
		} else {
			// Read position is higher; writePos must have wrapped around
			nInterleavedReadable = this._data.length - this._readPos + this._writePos;
		}

		// divide by the number of channels
		return nInterleavedReadable / this._nChannels;
	}

	/**
	 * Reads the specified number of samples (per channel) from the buffer into a new array
	 *
	 * @param  {Number} nSamples The number of samples (per channel) to read
	 * @return {Array}           An mxn array of m Float32Arrays with length n
	 */
	read(nSamples, channels = null) {
		let _channels =
			channels === null
				? Array.apply(null, Array(this._nChannels)).map(() => {
						return new Float32Array(nSamples);
				  })
				: channels;

		let readableSamples = Math.min(nSamples, this.getNReadableSamples());
		let readPos = this._readPos;

		for (let i = 0; i < readableSamples; i++) {
			for (let j = 0; j < _channels.length; j++) {
				if (readPos === this._data.length) readPos = 0;

				_channels[j][i] = this._data[readPos++];
			}
		}

		this._readPos = readPos;

		return _channels;
	}

	/**
	 * Resize the _data to accomodate for large chunks. Resizing will only happen if the number of
	 * samples fed is > this.bufferLength.
	 *
	 * @param { Number } nInterleavedSamples The size of the chunk
	 */
	_resize(nInterleavedSamples) {
		let nReadableInterleavedSamples =
			this.getNReadableSamples() * this._nChannels;
		let newLength = nInterleavedSamples + nReadableInterleavedSamples;

		let newArray = new Float32Array(newLength);

		let readPos = this._readPos;
		for (let i = 0; i < nReadableInterleavedSamples; i++) {
			newArray[i] = this._data[readPos++];
		}

		this._writePos = nReadableInterleavedSamples;
		this._readPos = 0;
		this._data = newArray;
	}

	/**
	 * Writes data to the buffer, expanding the buffer if need be.
	 *
	 * @param  { Float32Array } float32Data Mono or multi-channel interleaved data
	 * @return { Array }        Array containing [didResize, bufferLength]
	 */
	write(float32Data) {
		if (!ArrayBuffer.isView(float32Data))
			throw `Must submit a TypedArray. Received ${float32Data.constructor.name}`;
		let didResize = false;

		// if submitted array is longer than internal buffer, resize interal array.
		if (float32Data.length > this._data.length) {
			this._resize(float32Data.length);
			didResize = true;
		}

		let writePos = this._writePos;
		for (let i = 0; i < float32Data.length; i++) {
			if (writePos === this._data.length) writePos = 0;

			this._data[writePos++] = float32Data[i];
		}
		this._writePos = writePos;

		return [didResize, this._data.length / this._nChannels];
	}
}

export default RingBuffer;
