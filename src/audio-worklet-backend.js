import { AbstractBackend, BackendState } from "./abstract-backend";

/**
 * Loads the AudioWorkletProcessor, initializes it, then resolves with a new instance of AudioWorkletBackend
 *
 * @param { AudioContext } context         The parent AudioContext
 * @param { Number }       nChannels       The number of input and output channels
 * @param { Number }       bufferLength    The length of the RingBuffer. See ring-buffer.js for more
 * @param { Number }       bufferThreshold The minimum number of sample which must be buffered before
 *                                         audio begins propagating to the next AudioNode in the graph
 * @param { String }       pathToWorklet   The location of the AudioWorklet file. Default is
 *                                         '/audio-feeder.worklet.js'
 */
export default function createAudioWorklet(
	context,
	nChannels,
	bufferLength,
	bufferThreshold,
	pathToWorklet
) {
	let _nChannels = nChannels;

	// define this here so that window is accessible
	class WorkletNode extends AudioWorkletNode {
		constructor(context) {
			super(context, "FeederNode", {
				numberOfInputs: 0,
				numberOfOutputs: 1,
				outputChannelCount: [_nChannels],
			});
		}
	}

	return new Promise((resolve) => {
		context.audioWorklet.addModule(pathToWorklet).then(() => {
			let workletNode = new WorkletNode(context);
			workletNode.port.postMessage({
				command: "init",
				nChannels: nChannels,
				bufferLength: bufferLength,
				bufferThreshold: bufferThreshold,
			});

			let backend = new AudioWorkletBackend(
				nChannels,
				bufferLength,
				workletNode
			);
			resolve(backend);
		});
	});
}

/** Audio backend which plays + processes audio on the Audio Thread */
class AudioWorkletBackend extends AbstractBackend {
	/**
	 * Constructor.
	 *
	 * @param { Number }       nChannels    The number of input and output channels
	 * @param { Number }       bufferLength The length of the RingBuffer. See ring-buffer.js for more
	 * @param { AudioNode }    audioNode    The initialized AudioWorkletProcessor
	 */
	constructor(nChannels, bufferLength, audioNode) {
		super();

		this.nChannels = nChannels;
		this.bufferLength = bufferLength;
		this.audioNode = audioNode;
		this.batchSize = 128;
		this.state = BackendState.READY;

		audioNode.port.onmessage = this._onMessage.bind(this);
	}

	/**
	 * Passes data to the AudioWorkletProcessor for playback
	 */
	feed(float32Array) {
		if (this.state === BackendState.UNINITIALIZED) {
			console.warn("tried to call feed() on uninitialized backend");
		} else {
			this.audioNode.port.postMessage({ command: "feed", data: float32Array }, [
				float32Array.buffer,
			]);
		}
	}

	/**
	 * Passes the port the audioNode to receive data directly from resamplers.
	 *
	 * @param { MessagePort } port port1 or port2 from a MessageChannel
	 */
	setPort(port) {
		this.audioNode.port.postMessage({ command: "connect" }, [port]);
	}

	/**
	 * Loads + intializes the AudioWorkletProcessor, then connects it to the provided destination AudioNode
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
	 * Called whenever a message from the AudioWorkletProcessor is received
	 *
	 * @param {Event} e https://developer.mozilla.org/en-US/docs/Web/API/MessagePort
	 */
	_onMessage(e) {
		if (e.data.command === "bufferLengthChange") {
			this.bufferLength = e.data.bufferLength;
		} else if (e.data.command === "stateChange") {
			this.onStateChange(e.data.state);
		} else {
			throw `command ${e.data.command} unrecognized`;
		}
	}
}
