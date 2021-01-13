import AbstractProcessor from './abstract-processor';
import Worker from './feeder-node.worker.js';

/** 
 * Class that passes audio data to a Web Worker to be resampled. If client is also using AudioWorklet
 * and AudioWorkletBackend, passes data directly from worker thread to audio thread via MessagePort
 */
export default class WorkerResampler extends AbstractProcessor {
	constructor(inputSampleRate, outputSampleRate, nChannels, onProcessedCallback, port, pathToWorker) {
		super(inputSampleRate, outputSampleRate, onProcessedCallback);

		this.worker = new Worker();

		this.worker.onmessage = this._onMessage.bind(this);
		this.worker.postMessage({
			command: 'init', 
			inputSampleRate: inputSampleRate, 
			outputSampleRate: outputSampleRate, 
			nChannels: nChannels
		});

		if (port !== undefined) this.worker.postMessage({command: 'connect'}, [port]);
	}

	/**
	 * Passes data off to the worker for resampling
	 *
	 * @param {ArrayBuffer} interleavedFloat32Data A float32Array of interleaved/mono audio data
	 */
	processBatch(interleavedFloat32Data) {
		this.worker.postMessage({command: 'feed', data: interleavedFloat32Data}, [interleavedFloat32Data.buffer]);
	}

	/**
	 * Called by the worker when a batch has been successfully resampled
	 *
	 * @param {Event} e https://developer.mozilla.org/en-US/docs/Web/API/MessagePort
	 */
	_onMessage(e) {
		this._onProcessedCallback(e.data);
	}
}