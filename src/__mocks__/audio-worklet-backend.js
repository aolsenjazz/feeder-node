import { AbstractBackend } from "../abstract-backend.js";

export default function createAudioWorklet(
	context,
	nChannels,
	batchSize,
	bufferLength,
	bufferThreshold,
	pathToWorklet
) {
	return new Promise((resolve) => {
		resolve(
			new AudioWorkletBackend(
				context,
				nChannels,
				batchSize,
				bufferLength,
				bufferThreshold,
				pathToWorklet
			)
		);
	});
}

class AudioWorkletBackend extends AbstractBackend {
	constructor(
		context,
		nChannels,
		batchSize,
		bufferLength,
		bufferThreshold,
		pathToWorklet
	) {
		super();

		this.context = context;
		this.nChannels = nChannels;
		this.batchSize = batchSize;
		this.bufferLength = bufferLength;
		this.bufferThreshold = bufferThreshold;
		this.pathToWorklet = pathToWorklet;
	}

	feed(float32Array) {
		this.data = float32Array;
	}

	connect(output) {
		this.output = output;
	}

	disconnect() {
		this.output = null;
	}

	setPort(port) {
		this.port = port;
	}
}
