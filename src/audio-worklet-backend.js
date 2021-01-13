import { AbstractBackend, BackendState } from './abstract-backend';

/** Audio backend which plays + processes audio on the Audio Thread */
export default class AudioWorkletBackend extends AbstractBackend {
	constructor(context, batchSize, nChannels, bufferLength, bufferThreshold, 
		        stateChangeCb, port, pathToWorkletProcessor) {
		super();

		this.context = context;
		this.nChannels = nChannels;
		this.bufferLength = bufferLength;
		this.bufferThreshold = bufferThreshold;
		this._stateChangeCb = stateChangeCb;
		this.pathToWorkletProcessor = pathToWorkletProcessor
		this.port = port;
		this.state = BackendState.UNINITIALIZED;

		if (batchSize != 128) {
			console.warn(`Batch size ${batchSize} requested, but AudioWorklets are hardcoded to 128`);
		}
	}

	/**
	 * Passes data to the AudioWorkletProcessor for playback
	 */
	feed(float32Array) {
		this.audioNode.port.postMessage({command: 'feed', data: float32Array}, [float32Array.buffer]);
	}

	/**
	 * Called whenever a message from the AudioWorkletProcessor is received
	 * 
	 * @param {Event} e https://developer.mozilla.org/en-US/docs/Web/API/MessagePort
	 */
	_onMessage(e) {
		if (e.data.command === 'bufferLengthChange') {
			this.bufferLength = e.data.bufferLength;
		} else if (e.data.command === 'stateChange') {
			this._stateChangeCb(e.data.state);
		} else {
			throw `command ${e.data.command} unrecognized`;
		}
	}

	/**
	 * Loads + intializes the AudioWorkletProcessor, then connects it to the provided output AudioNode
	 * 
	 * @param {AudioNode} output The node to which FeederNode will connect
	 */
	connect(output) {
		let outputs = this.nChannels;
		// define this here so that window is accessible
		class WorkletNode extends AudioWorkletNode {
			constructor(context) {
				super(context, 'FeederNode', {
					numberOfInputs: 0, 
					numberOfOutputs: 1,
					outputChannelCount: [outputs]
				});
			}
		}

		this.context.audioWorklet.addModule(this.pathToWorkletProcessor).then(() => {
			this.audioNode = new WorkletNode(this.context);
			this.audioNode.connect(output);
			this.audioNode.port.postMessage({
				command: 'init', 
				nChannels: this.nChannels, 
				bufferLength: this.bufferLength,
				bufferThreshold: this.bufferThreshold,
			});
			this.audioNode.port.onmessage = this._onMessage.bind(this);

			if (this.port !== undefined) this.audioNode.port.postMessage({command: 'connect'}, [this.port]);
		});
	}

	/**
	 * Disconnect from the connected AudioNode
	 */
	disconnect() {
		if (this.audioNode) {
			this.audioNode.disconnect();
		}
	}
}