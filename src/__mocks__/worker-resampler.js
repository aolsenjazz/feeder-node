import AbstractProcessor from '../abstract-processor';

export default function createWorkerResampler(nChannels, inputSampleRate, outputSampleRate, converterType) {
	return new Promise((resolve, reject) => {
		resolve(new WorkerResampler(nChannels, inputSampleRate, outputSampleRate, converterType));
	});
}

class WorkerResampler extends AbstractProcessor {

	constructor(nChannels, inputSampleRate, outputSampleRate, converterType) {
		super(inputSampleRate, outputSampleRate);

		this.nChannels = nChannels;
		this.converterType = converterType;
	}

	processBatch(interleavedFloat32Data) {
		this.data = interleavedFloat32Data;
	}

	setPort(port) {
		this.port = port;
	}
}