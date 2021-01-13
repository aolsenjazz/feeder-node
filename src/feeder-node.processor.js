import RingBuffer from './ring-buffer.js';
import { writeSilence } from './util.js';
import { BackendState } from './abstract-backend';

const BATCH_SIZE = 128; // non-negotiable (thanks AudioWorklet)

/** AudioWorkletProcessor loaded by audio-worklet-backend to do the audio-thread processing */
export default class WorkletProcessor extends AudioWorkletProcessor {
	
	nChannels;

	constructor(options) {
		super();
		this.port.onmessage = this._onMessage.bind(this);
		
		this.bufferThreshold;
		this.state = BackendState.UNINITIALIZED;
	}

	/**
	 * Called whenever the AudioWorkletProcessor has data to process/playback
	 *
	 * @param {Array} inputs      An array containing 0 Float32Arrays. unused
	 * @param {Array} outputs     An array containing this.nChannels Float32Arrays
	 * @param {Object} parameters Object containing audio parameters. unused
	 */
	process(inputs, outputs, parameters) {
		this._updateState();

		if (this.state === BackendState.PLAYING) {
			this._buffer.readInto(outputs[0], BATCH_SIZE);
		} else {
			writeSilence(outputs[0]);
		}

		return true;
	}

	/**
	 * Changes state depending on how much data is available to read into AudioNode chain. If
	 * WorkletProcess runs out of data, switches to STARVED; once it buffers enough data, switch
	 * back to PLAYING
	 */
	_updateState() {
		let staleState = this.state;

		switch (this.state) {
			case BackendState.UNINITIALIZED:
				return;
			case BackendState.PLAYING:
				if (this._buffer.getNReadableSamples() === 0) this.state = BackendState.STARVED;
				break;
			case BackendState.READY:
			case BackendState.STARVED:
				if (this._buffer.getNReadableSamples() >= this.bufferThreshold) this.state = BackendState.PLAYING;
				break;
			default:
		}

		if (staleState != this.state) this._notifyStateChange();
	}

	/**
	 * Notifies the parent FeederNode of the state change
	 */
	_notifyStateChange() {
		this.port.postMessage({command: 'stateChange', state: this.state});
	}

	/**
	 * Called whenever the AudioWorkletProcessor received a message from the main thread. Use to initialize
	 * values and receive audio data.
	 *
	 * @param {Event} e https://developer.mozilla.org/en-US/docs/Web/API/MessagePort
	 */
	_onMessage(e) {
		switch (e.data.command) {
			case 'init':
				this.nChannels = e.data.nChannels;
				this._init(e.data.bufferLength, e.data.nChannels, e.data.bufferThreshold);
				break;
			case 'feed':
				this._feed(e.data.data);
				break;
			case 'connect':
				e.ports[0].onmessage = this._onMessage.bind(this);
				break;
			default:
				throw Error('command not specified');
		}
	}

	/**
	 * Queues audio data to be played back
	 *
	 * @param {Float32Array} float32Array interleaved (if channels > 0) audio data
	 */
	_feed(float32Array) {
		let [didResize, bufferLength] = this._buffer.write(float32Array, this.nChannels > 1);

		if (didResize) {
			this.port.postMessage({command: 'bufferLengthChange', bufferLength: bufferLength});
		}
	}

	/**
	 * Initializes with the given values. This should be called immediately after loading the processor.
	 *
	 * @param {Number} bufferLength    the length of the RingBuffer (this._buffer)
	 * @param {Number} nChannels       the number of outputs channels 
	 * @param {Number} bufferThreshold # of samples (per channel) to queue before transmission to output begins
	 */
	_init(bufferLength, nChannels, bufferThreshold) {
		this._buffer = new RingBuffer(bufferLength, nChannels);
		this.bufferThreshold = bufferThreshold;
		this.state = BackendState.READY;
		this._notifyStateChange();
	}
}

registerProcessor('FeederNode', WorkletProcessor);