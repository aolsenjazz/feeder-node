/** Abstract class for Processors which process audio data before handing to AudioNode chain */
export default class AbstractProcessor {

	/**
	 * Constructor.
	 * 
	 * @param { Number } inputSampleRate  The sample rate of incoming data
	 * @param { Number } outputSampleRate The sampleRate which processed data should be
	 */
	constructor(inputSampleRate, outputSampleRate) {
		this.inputSampleRate = inputSampleRate;
		this.outputSampleRate = outputSampleRate;
	}

	/**
	 * Operate on interleavedFloat32Data. Once operations are complete, return data with onProcessed()
	 *
	 * @param { Float32Array } interleavedFloat32Data Mono or interleaved audio data
	 */
	processBatch(interleavedFloat32Data) {
		throw new Error('processBatch must be overridden!');
	}


	/**
	 * Called once data has been operated on by processBatch(). Override me.
	 * 
	 * @param { Float32Array } interleavedFloat32Data Mono or interleaved audio data
	 */
	onProcessed(interleavedFloat32Data) {
		throw new Error('onProcessed must be overridden!');
	}

	/**
	 * Sets a MessageChannel Port to send processed data thru. Should be, but doesn't *have* to be
	 * implemented by subclasses.
	 * 
	 * @param { MessagePort } port port1 or port2 from a MessageChannel
	 */
	setPort(port) {}
}