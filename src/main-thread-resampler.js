import AbstractProcessor from "./abstract-processor";
import LinearResampler from "./resampler";
import { copyInterleavedToChannels, writeChannelsToInterleaved } from "./util";

/**
 * Class that resamples audio data on the main thread. Since almost all browsers support web workers
 * at this point, this will probably never be used; worker-resampler.js will be used instead
 */
export default class MainThreadResampler extends AbstractProcessor {
	/**
	 * Constructor
	 *
	 * @param { Number } nChannels        The number of input and output channels
	 * @param { Number } inputSampleRate  Sample rate of incoming audio
	 * @param { Number } outputSampleRate Sample rate which outgoing audio must be
	 */
	constructor(nChannels, inputSampleRate, outputSampleRate) {
		super(inputSampleRate, outputSampleRate);

		this.nChannels = nChannels;

		// channels need to be de-interleaved before processing. store de-interleaved data in this resusable buffer
		this.inputChannelBuffers = Array.apply(null, Array(nChannels)).map(() => {
			return new Float32Array(192000);
		});

		this._resampler = new LinearResampler(
			inputSampleRate,
			outputSampleRate,
			nChannels
		);
	}

	/**
	 * Resample the audio data if necessary, then send back via callback
	 *
	 * @param {Float32Array} interleavedFloat32Data the data to be resampled
	 */
	processBatch(interleavedFloat32Data) {
		if (this.inputSampleRate === this.outputSampleRate)
			return this.onProcessed(interleavedFloat32Data);

		let dataPerChannel = interleavedFloat32Data.length / this.nChannels;

		// resize input buffers if necessary
		if (dataPerChannel > this.inputChannelBuffers[0].length) {
			this.inputChannelBuffers = Array.apply(null, Array(this.nChannels)).map(
				() => {
					return new Float32Array(dataPerChannel);
				}
			);
		}

		// resample
		copyInterleavedToChannels(interleavedFloat32Data, this.inputChannelBuffers);
		let trimmedBuffers = this.inputChannelBuffers.map(
			(float32Array) => new Float32Array(float32Array.buffer, 0, dataPerChannel)
		);
		let resampledBuffers = this._resampler.resample(trimmedBuffers);
		let reinterleaved = writeChannelsToInterleaved(resampledBuffers);

		this.onProcessed(reinterleaved);
	}
}
