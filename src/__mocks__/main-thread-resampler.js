import AbstractProcessor from '../abstract-processor';

export default class MainThreadResampler extends AbstractProcessor {
	constructor(nChannels, inputSampleRate, outputSampleRate) {
		super(inputSampleRate, outputSampleRate);

		this.nChannels = nChannels;
	}

	processBatch(interleavedFloat32Data) {
		this.data = interleavedFloat32Data;
	}

	setPort(port) {
		this.port = port;
	}
}