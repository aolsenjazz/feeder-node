import 'web-audio-test-api';
import 'babel-polyfill';

import create from '../src/feeder-node-create.js';

class MessageChannelMock {

}
global.MessageChannel = MessageChannelMock;

test('vaidate() nChannels < 1 fails', (done) => {
	let context = new AudioContext();
	let nChannels = 0;
	let options = {
		batchSize: 512,
		bufferThreshold: 4096,
		bufferLength: 192000,
		resampConverterType: 0,
		inputSampleRate: 44100
	}

	create(context, nChannels, options)
		.then((feederNode) => {

		})
		.catch((err) => {
			expect(err).toBe('invalid nChannels 0');
			done();
		});
});

test('validate() nChannels > 2 fails', (done) => {
	let context = new AudioContext();
	let nChannels = 3;
	let options = {
		batchSize: 512,
		bufferThreshold: 4096,
		bufferLength: 192000,
		resampConverterType: 0,
		inputSampleRate: 44100
	}

	create(context, nChannels, options)
		.then((feederNode) => {

		})
		.catch((err) => {
			expect(err).toBe('invalid nChannels 3');
			done();
		});
});

test('validate() nChannels undefined fails', (done) => {
	let context = new AudioContext();
	let nChannels = undefined;
	let options = {
		batchSize: 512,
		bufferThreshold: 4096,
		bufferLength: 192000,
		resampConverterType: 0,
		inputSampleRate: 44100
	}

	create(context, nChannels, options)
		.then((feederNode) => {

		})
		.catch((err) => {
			expect(err).toBe('nChannels is undefined');
			done();
		});
});

test('validate() batchSize not in supported sizes fails', (done) => {
	let context = new AudioContext();
	let nChannels = 2;
	let options = {
		batchSize: 511,
		bufferThreshold: 4096,
		bufferLength: 192000,
		resampConverterType: 0,
		inputSampleRate: 44100
	}

	create(context, nChannels, options)
		.then((feederNode) => {

		})
		.catch((err) => {
			expect(err).toBe(`invalid batchSize ${options.batchSize}`);
			done();
		});
});

test('validate() bufferLength < 16384 fails', (done) => {
	let context = new AudioContext();
	let nChannels = 2;
	let options = {
		batchSize: 512,
		bufferThreshold: 4096,
		bufferLength: 16380,
		resampConverterType: 0,
		inputSampleRate: 44100
	}

	create(context, nChannels, options)
		.then((feederNode) => {

		})
		.catch((err) => {
			expect(err).toBe('buffer length must be greater than 16384');
			done();
		});
});

test('validate() bufferThreshold < 0 fails', (done) => {
	let context = new AudioContext();
	let nChannels = 2;
	let options = {
		batchSize: 512,
		bufferThreshold: -1,
		bufferLength: 16384,
		resampConverterType: 0,
		inputSampleRate: 44100
	}

	create(context, nChannels, options)
		.then((feederNode) => {

		})
		.catch((err) => {
			expect(err).toBe('bufferThreshold cannot be less than 0');
			done();
		});
});

test('validate() bufferThreshold > bufferLength', (done) => {
	let context = new AudioContext();
	let nChannels = 2;
	let options = {
		batchSize: 512,
		bufferThreshold: 16385,
		bufferLength: 16384,
		resampConverterType: 0,
		inputSampleRate: 44100
	}

	create(context, nChannels, options)
		.then((feederNode) => {

		})
		.catch((err) => {
			expect(err).toBe('bufferThreshold cannot be greater than bufferLength');
			done();
		});
});

test('validate() converterType < 0 fails', (done) => {
	let context = new AudioContext();
	let nChannels = 2;
	let options = {
		batchSize: 512,
		bufferThreshold: 4096,
		bufferLength: 16384,
		resampConverterType: -1,
		inputSampleRate: 44100
	}

	create(context, nChannels, options)
		.then((feederNode) => {

		})
		.catch((err) => {
			expect(err).toBe(`invalid converterType ${options.resampConverterType}`);
			done();
		});
});

test('validate() converterType > 4 fails', (done) => {
	let context = new AudioContext();
	let nChannels = 2;
	let options = {
		batchSize: 512,
		bufferThreshold: 4096,
		bufferLength: 16384,
		resampConverterType: 5,
		inputSampleRate: 44100
	}

	create(context, nChannels, options)
		.then((feederNode) => {

		})
		.catch((err) => {
			expect(err).toBe(`invalid converterType ${options.resampConverterType}`);
			done();
		});
});

test('validate() inputSampleRate < 1 fails', (done) => {
	let context = new AudioContext();
	let nChannels = 2;
	let options = {
		batchSize: 512,
		bufferThreshold: 4096,
		bufferLength: 16384,
		resampConverterType: 4,
		inputSampleRate: -1
	}

	create(context, nChannels, options)
		.then((feederNode) => {

		})
		.catch((err) => {
			expect(err).toBe(`invalid inputSampleRate ${options.inputSampleRate}`);
			done();
		});
});

test('validate() inputSampleRate > 192000 fails', (done) => {
	let context = new AudioContext();
	let nChannels = 2;
	let options = {
		batchSize: 512,
		bufferThreshold: 4096,
		bufferLength: 16384,
		resampConverterType: 4,
		inputSampleRate: 192001
	}

	create(context, nChannels, options)
		.then((feederNode) => {

		})
		.catch((err) => {
			expect(err).toBe(`invalid inputSampleRate ${options.inputSampleRate}`);
			done();
		});
});

test('createResample() with no WebAssembly support creates MainThreadResampler', (done) => {
	let context = new AudioContext();
	let nChannels = 2;

	// simulate browser that doesn't support webassembly
	const wasm = window.WebAssembly;
	global.WebAssembly = undefined;

	create(context, nChannels)
		.then((feederNode) => {
			expect(feederNode._resampler.constructor.name).toBe('MainThreadResampler');
			done();
			global.WebAssembly = wasm; // reset wasm
		})
		.catch((err) => {
			throw err;
		});
});

test('createResample() with WebAssembly support creates WorkerResampler', (done) => {
	let context = new AudioContext();
	let nChannels = 2;

	create(context, nChannels)
		.then((feederNode) => {
			expect(feederNode._resampler.constructor.name).toBe('WorkerResampler');
			done();
		})
		.catch((err) => {
			throw err;
		});
});

// note: the test web audio framework imported doesn't contain AudioWorklet
test('createBackend() with no AudioWorklet support create ScriptProcessorBackend', (done) => {
	let context = new AudioContext();
	let nChannels = 2;

	create(context, nChannels)
		.then((feederNode) => {
			expect(feederNode._backend.constructor.name).toBe('ScriptProcessorBackend');
			done();
		})
		.catch((err) => {
			throw err;
		});
});

// note: the test web audio framework imported doesn't contain AudioWorklet
test('createBackend() with AudioWorklet support creates AudioWorkletBackend', (done) => {
	let context = new AudioContext();
	let nChannels = 2;

	global.AudioWorklet = {}; // see note

	create(context, nChannels)
		.then((feederNode) => {
			expect(feederNode._backend.constructor.name).toBe('AudioWorkletBackend');
			done();

			global.AudioWorklet = undefined; // reset AudioWorklet
		})
		.catch((err) => {
			throw err;
		});
});