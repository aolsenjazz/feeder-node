import { AbstractBackend, BackendState } from './abstract-backend';
import RingBuffer from './ring-buffer';
import { writeSilence } from './util';

/** Class that manages a ScriptProcessor to playback PCM audio */
export default class ScriptProcessorBackend extends AbstractBackend {

	constructor(context, batchSize, nChannels, bufferLength, bufferThreshold, stateChangeCb, port) {
		super();

		this.batchSize = batchSize;
		this.nChannels = nChannels;
		this.bufferThreshold = bufferThreshold;
		this._stateChangeCb = stateChangeCb;
		this._processor = context.createScriptProcessor(this.batchSize, 0, this.nChannels);
		this._processor.onaudioprocess = this._playNext.bind(this);

		this._buffer = new RingBuffer(bufferLength, this.nChannels);
		this.state = BackendState.READY;
	}

	/** getter */
	get bufferLength() { return this._buffer.bufferLength; }

	/**
	 * Appends data to the ends of the ArrayBuffer. If float32Array.length > the current buffer size,
	 * buffer will automatically reseize to fit the new chunk
	 *
	 * @param {Float32Array} data to write to the RingBuffeer
	 */
	feed(float32Array) {
		this._buffer.write(float32Array);
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
		this._stateChangeCb(this.state);
	}

	/**
	 * Connects the ScriptProcessorNode to the given output AudioNode
	 * 
	 * @param {AudioNode} output The node to which FeederNode will connect
	 */
	connect(output) {
		this._processor.connect(output);
	}

	/**
	 * Disconnect from the connected AudioNode
	 */
	disconnect() {
		this._processor.disconnect();
	}

	/**
	 * Called whenever the ScriptProcessor wants to consume more audio
	 *
	 * @param {AudioProcessingEvent} https://developer.mozilla.org/en-US/docs/Web/API/AudioProcessingEvent
	 */
	_playNext(audioProcessingEvent) {
		this._updateState();

		let outs = Array.apply(null, Array(this.nChannels)).map((x, i) => { return audioProcessingEvent.outputBuffer.getChannelData(i) });

		if (this.state === BackendState.PLAYING) {
			this._buffer.readInto(outs, this.batchSize);
		} else {
			writeSilence(outs);
		}
	}
}