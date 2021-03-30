import AbstractProcessor from "./abstract-processor";

/**
 * Initializes a WebWorker (which initializes the web assembly module), and then once init complete,
 * resolve() with a new instance of WorkerResampler
 *
 * *** Unexpected Behavior ***
 * If the following sequence is executed:
 * 1) create AudioContext
 * 2) createWorkerResampler
 * 3) createScriptProcessorNode
 *
 * Script processor node will silently fail to intialize the AudioContext IN SAFARI. I suspect that this
 * is because audio needs to be played in response to a gesture, and by running createWorkerResampler,
 * we're effectly terminating that behavior because we're waiting for a message from message channel.
 *
 * @param { Number } nChannels        The number of input and output channels
 * @param { Number } inputSampleRate  Sample rate of incoming audio
 * @param { Number } outputSampleRate Sample rate which outgoing audio must be
 * @param { Number } converterType    One of libsamplerate.ConverterType:
 *                                    http://www.mega-nerd.com/SRC/api_misc.html#Converters
 * @param { String } pathToWorker     Path from server root to feeder-node.worker.js
 * @param { String } pathToWorklet    Path from server root to libsamplerate.wasm
 *
 */
export default function createWorkerResampler(
	nChannels,
	inputSampleRate,
	outputSampleRate,
	converterType,
	pathToWorker,
	pathToWasm
) {
	return new Promise((resolve) => {
		let worker = new Worker(pathToWorker);

		worker.onmessage = () => {
			resolve(
				new WorkerResampler(
					nChannels,
					inputSampleRate,
					outputSampleRate,
					converterType,
					worker
				)
			);
		};

		worker.postMessage({
			command: "init",
			inputSampleRate: inputSampleRate,
			outputSampleRate: outputSampleRate,
			nChannels: nChannels,
			converterType: converterType,
			pathToWasm: pathToWasm,
		});

		// resolve();
	});
}

/**
 * Class that passes audio data to a Web Worker to be resampled. If client is also using AudioWorklet
 * and AudioWorkletBackend, passes data directly from worker thread to audio thread via MessagePort
 */
class WorkerResampler extends AbstractProcessor {
	/**
	 * Constructor. This *should not* be called; use create() instead
	 *
	 * @param { Number } nChannels        The number of input and output channels
	 * @param { Number } inputSampleRate  Sample rate of incoming audio
	 * @param { Number } outputSampleRate Sample rate which outgoing audio must be
	 * @param { Number } converterType    One of libsamplerate.ConverterType:
	 *                                    http://www.mega-nerd.com/SRC/api_misc.html#Converters
	 * @param { Worker } worker           Web Worker where the actually conversaion happens
	 */
	constructor(
		nChannels,
		inputSampleRate,
		outputSampleRate,
		converterType,
		worker
	) {
		super(inputSampleRate, outputSampleRate);

		this.worker = worker;

		this.worker.onmessage = this._onMessage.bind(this);
	}

	/**
	 * Passes data off to this.worker for resampling
	 *
	 * @param {ArrayBuffer} interleavedFloat32Data A float32Array of interleaved/mono audio data
	 */
	processBatch(interleavedFloat32Data) {
		this.worker.postMessage({ command: "feed", data: interleavedFloat32Data }, [
			interleavedFloat32Data.buffer,
		]);
	}

	/**
	 * Sets a MessageChannel Port to send processed data thru. If this is set, the worker send processed
	 * data thru the message port, bypassing this.onProcessed()
	 *
	 * @param { MessagePort } port port1 or port2 from a MessageChannel
	 */
	setPort(port) {
		this.worker.postMessage({ command: "connect" }, [port]);
	}

	/**
	 * Called by the worker when a batch has been successfully resampled
	 *
	 * @param {Event} e https://developer.mozilla.org/en-US/docs/Web/API/MessagePort
	 */
	_onMessage(e) {
		this.onProcessed(e.data);
	}
}
