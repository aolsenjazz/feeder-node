import { AbstractBackend } from '../abstract-backend.js';

export default class ScriptProcessorBackend extends AbstractBackend {
	constructor(context, nChannels, batchSize, bufferLength, bufferThreshold) {
		super();

		this.context = context;
		this.nChannels = nChannels;
		this.batchSize = batchSize;
		this.bufferLength = bufferLength;
		this.bufferThreshold = bufferThreshold;
		this.audioNode = context.createScriptProcessor(batchSize, 0, nChannels);
	}

	feed(float32Array) {
		this.data = float32Array;
	}

	connect(output) {
		this.output = output;
	}

	disconnect() {
		this.destination = null;
	}

	setPort(port) {
		this.port = port;
	}
}