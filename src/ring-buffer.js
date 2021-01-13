class RingBuffer {
	
	_bufferLength;
	_nChannels;
	_data = [];
	_writePos = 0;
	_readPos = 0;

	constructor(bufferLength=32768, nChannels=2) {
		if (bufferLength <= 0) throw 'bufferLength must be >= 1';
		if (!(0 < nChannels) || !(nChannels <= 2)) throw 'nChannels must be 0 < nChannels <=2';

		for (let i = 0; i < nChannels; i++) {
			this._data.push(new Float32Array(bufferLength));
		}

		this.bufferLength = bufferLength;
		this._nChannels = nChannels;
	}

	/**
	 * Returns whether or not there's any data available to be read
	 *
	 * @return {boolean} is there any available data?
	 */
	hasDataAvailable() {
		return this._writePos != this._readPos;
	}

	/**
	 * Resets the read position, sucj that hasAvailableData() === false
	 */
	resetReadPosition() {
		this._readPos = this._writePos;
	}

	/**
	 * Returns the number of samples available. This number is per channel, not summed over the channels
	 *
	 * @return {Number} the number of samples to be read
	 */
	getNReadableSamples() {
		if (this._readPos == this._writePos) return 0;
		return (this._readPos < this._writePos) ? this._writePos - this._readPos : this.bufferLength - this._readPos + this._writePos;
	}

	/**
	 * Increases the read position by nSamples, effectively trimming nReadableSamples by nSamples
	 *
	 * @param {Number} nSamples The number of samples to advance the read position
	 */
	advanceReadPosition(nSamples) {
		let newPos = this._readPos;
		for (let i = 0; i < nSamples; i++) {
			if (newPos == this.bufferLength) newPos = 0;
			newPos++;
			if (newPos == this._writePos) break;
		}

		this._readPos = newPos;
	}

	/**
	 * Reads the specified number of samples (per channel) from the buffer into a new array
	 *
	 * @param  {Number} nSamples The number of samples (per channel) to read
	 * @return {Array}           An mxn array of m Float32Arrays with length n
	 */
	read(nSamples) {
		let channels = Array.apply(null, Array(this._nChannels)).map((x, i) => {return new Float32Array(nSamples)});
		let readableSamples = Math.min(nSamples, this.getNReadableSamples());
		let readChannelPos;

		for (let channelNum = 0; channelNum < channels.length; channelNum++) {
			let writeChannel = channels[channelNum];
			readChannelPos = this._readPos;

			for (let samplePos = 0; samplePos < readableSamples; samplePos++) {
				if (readChannelPos == this.bufferLength) readChannelPos = 0;

				writeChannel[samplePos] = this._data[channelNum][readChannelPos++];
			}
		}

		this._readPos = readChannelPos;
		return channels;
	}

	/**
	 * Reads the specified number of samples (nSamples) into a Float32Array. Useful if one
	 * wants to resuse buffers between reads.
	 *
	 * @param {Array}  channels An mxn Array of Float32Arrays with length n
	 * @param {Number} nSamples The number of samples (per channel) to read into the given arrays
	 */
	readInto(channels, nSamples) {
		let readableSamples = Math.min(nSamples, this.getNReadableSamples());
		let readChannelPos;

		for (let channelNum = 0; channelNum < channels.length; channelNum++) {
			readChannelPos = this._readPos;

			for (let samplePos = 0; samplePos < readableSamples; samplePos++) {
				if (readChannelPos == this.bufferLength) readChannelPos = 0;

				channels[channelNum][samplePos] = this._data[channelNum][readChannelPos++];
			}
		}
		
		this._readPos = readChannelPos;
	}

	/**
	 * Resizes the Float32Arrays in this._data. This will probably called when trying to put
	 * large chunks into the RingBuffer.
	 *
	 * @param {Number} newSize The new size, should be > this._data[0].length
	 */
	_resize(newSize) {
		let newChannels = [];
		let readableSamples = this.getNReadableSamples();
		for (let i = 0; i < this._nChannels; i++) {
			newChannels.push(new Float32Array(newSize));
		}

		this.readInto(newChannels, readableSamples);
	
		this._writePos = readableSamples;
		this._readPos = 0;
		this._data = newChannels;
		this.bufferLength = newChannels[0].length;
	}

	/**
	 * Writes the provided data to this._data. readChannels can be an Array of Float32Arrays or just
	 * a single Float32Array. If this.nChannels > 1, it will be assumed that any submission of a single
	 * Float32Array is interleaved.
	 *
	 * @param {Array || Float32Array} readChannels Float32Array of mono/interleaved data, or Array of Float32Arrays
	 */
	write(readChannels) {
		let interleaved = false;
		let didResize = false;
		let _readChannels;
		if (ArrayBuffer.isView(readChannels) && this._nChannels === 1) {
			// prepare for reading mono data
			_readChannels = [readChannels];
		} else if (ArrayBuffer.isView(readChannels)) {
			// one channel submitted & not in mono. assume interleaved.
			_readChannels = [readChannels];
			interleaved = true;
		} else {
			// received an array of Float32Arrays, validate as such
			if (readChannels.length != this._nChannels) throw 'readChannels.length must equal this._nChannels!';
			let channelLen = readChannels[0].length;
			for (let i = 0; i < readChannels.length; i++) 
				if (readChannels[i].length != channelLen) throw 'channel lengths differ in write()';
			_readChannels = readChannels;
		}

		// resize the RingBuffer if necessary
		let lengthPerChannel = interleaved ? _readChannels[0].length / this._data.length : _readChannels[0].length;
		if (lengthPerChannel > this.bufferLength) {
			this._resize(_readChannels[0].length + this.getNReadableSamples());
			didResize = true;
		}

		// copy [readChannels] into this._data
		let newWritePos;
		for (let channelNum = 0; channelNum < _readChannels.length; channelNum++) {
			let chan = _readChannels[channelNum];
			newWritePos = this._writePos;

			if (interleaved === true) {
				// if interleaved, copy each value in chan to each array in this._data
				for (let i = 0; i < chan.length; i += this._data.length) {
					if (newWritePos == this.bufferLength) newWritePos = 0;

					for (let j = 0; j < this._data.length; j++) {
						this._data[j][newWritePos] = chan[i + j];
					}

					newWritePos++;
				}

			} else {
				// non interleaved, copy every in channels [readChannels] to this.data. simple
				for (let samplePos = 0; samplePos < chan.length; samplePos++) {
					if (newWritePos == this.bufferLength) newWritePos = 0;

					this._data[channelNum][newWritePos++] = chan[samplePos];
				}
			}
		}

		// update write position
		this._writePos = newWritePos;

		return [didResize, this.bufferLength];
	}
}

export default RingBuffer;