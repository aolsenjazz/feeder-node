/** Abstract class for Processors which process audio data before handing to AudioNode chain */
export default class AbstractProcessor {
	constructor(inputSampleRate, outputSampleRate, onResampleCompleteCallback, port) {
		this.inputSampleRate = inputSampleRate;
		this.outputSampleRate = outputSampleRate;
		this._onProcessedCallback = onResampleCompleteCallback;
	}

	processBatch(arrayBuffer) {
		throw new Error('processBatch must be overridden!');
	}
}