import { AbstractBackend, BackendState } from "./abstract-backend";
import RingBuffer from "./ring-buffer";
import { writeSilence } from "./util";

/** Class that manages a ScriptProcessor to playback PCM audio */
export default class ScriptProcessorBackend extends AbstractBackend {
	/**
	 *
	 * @param { AudioContext } context         The parent AudioContext
	 * @param { Number }       nChannels       The number of input and output channels
	 * @param { Number }       batchSize       The number of samples (per channel) processed per call to
	 *                                         _playNext(). Generally, higher values (2048, 4096, 8192...)
	 *                                         should be preferred to reduce CPU load
	 * @param { Number }       bufferLength    The length of the RingBuffer. See ring-buffer.js for more
	 * @param { Number }       bufferThreshold The minimum number of sample which must be buffered before
	 *                                         audio begins propagating to the next AudioNode in the graph
	 */
	constructor(context, nChannels, batchSize, bufferLength, bufferThreshold) {
		super();

		this.batchSize = batchSize;
		this.nChannels = nChannels;
		this.bufferThreshold = bufferThreshold;
		this.audioNode = context.createScriptProcessor(batchSize, 0, nChannels);
		this.audioNode.onaudioprocess = this._playNext.bind(this);

		this._buffer = new RingBuffer(bufferLength, nChannels);
		this.state = BackendState.READY;
	}

	/** getter */
	get bufferLength() {
		return this._buffer.bufferLength;
	}

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
	 * Connects the ScriptProcessorNode to the given destination AudioNode
	 *
	 * @param {AudioNode} destination The node to which FeederNode will connect
	 */
	connect(destination) {
		this.audioNode.connect(destination);
	}

	/**
	 * Disconnect from the connected AudioNode
	 */
	disconnect() {
		this.audioNode.disconnect();
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
				if (this._buffer.getNReadableSamples() === 0)
					this.state = BackendState.STARVED;
				break;
			case BackendState.READY:
			case BackendState.STARVED:
				if (this._buffer.getNReadableSamples() >= this.bufferThreshold)
					this.state = BackendState.PLAYING;
				break;
			default:
		}

		if (staleState != this.state) this.onStateChange(this.state);
	}

	/**
	 * Called whenever the ScriptProcessor wants to consume more audio
	 *
	 * @param {AudioProcessingEvent} https://developer.mozilla.org/en-US/docs/Web/API/AudioProcessingEvent
	 */
	_playNext(audioProcessingEvent) {
		this._updateState();

		let outs = Array.apply(null, Array(this.nChannels)).map((x, i) => {
			return audioProcessingEvent.outputBuffer.getChannelData(i);
		});

		if (this.state === BackendState.PLAYING) {
			this._buffer.read(this.batchSize, outs);
		} else {
			writeSilence(outs);
		}
	}
}
