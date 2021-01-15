import createWorkerResampler from 'WORKER_RESAMPLER';
import Worker from '../src/feeder-node.worker.js';

global.Worker = Worker;

test('createWorkerResampler() resolves with a new instance', (done) => {
	let nChannels = 2;
	let inputSampleRate = 44100;
	let outputSampleRate = 48000;
	let converterType = 0;
	let workerPath = '../src/feeder-node.worker.js';
	let wasmPath = 'doesnt matter';

	createWorkerResampler(nChannels, inputSampleRate, outputSampleRate, converterType, workerPath, wasmPath)
		.then((resampler) => {
			expect(resampler.constructor.name).toBe('WorkerResampler');
			done();
		})
		.catch((err) => {
			throw err;
		});
});

test('calling processBatch() passes data to worker', (done) => {
	let nChannels = 2;
	let inputSampleRate = 44100;
	let outputSampleRate = 48000;
	let converterType = 0;
	let workerPath = '../src/feeder-node.worker.js';
	let wasmPath = 'doesnt matter';

	createWorkerResampler(nChannels, inputSampleRate, outputSampleRate, converterType, workerPath, wasmPath)
		.then((resampler) => {
			resampler.onProcessed = () => {};
			let data = new Float32Array([1,2,3,4]);
			resampler.processBatch(data);
			expect(JSON.stringify(resampler.worker.data)).toBe(JSON.stringify(data));
			done();
		})
		.catch((err) => {
			throw err;
		});
});

test('calling setPort() passes port to the worker', (done) => {
	let nChannels = 2;
	let inputSampleRate = 44100;
	let outputSampleRate = 48000;
	let converterType = 0;
	let workerPath = '../src/feeder-node.worker.js';
	let wasmPath = 'doesnt matter';

	createWorkerResampler(nChannels, inputSampleRate, outputSampleRate, converterType, workerPath, wasmPath)
		.then((resampler) => {
			resampler.setPort('yo');
			expect(resampler.worker.connected).toBe(true);
			done();
		})
		.catch((err) => {
			throw err;
		});
});

test('calling processBatch() calls onProcessed() once complete', (done) => {
	let nChannels = 2;
	let inputSampleRate = 44100;
	let outputSampleRate = 48000;
	let converterType = 0;
	let workerPath = '../src/feeder-node.worker.js';
	let wasmPath = 'doesnt matter';

	createWorkerResampler(nChannels, inputSampleRate, outputSampleRate, converterType, workerPath, wasmPath)
		.then((resampler) => {
			let data = new Float32Array([1,2,3,4]);

			resampler.onProcessed = (processed) => {
				expect(JSON.stringify(processed)).toBe(JSON.stringify(data));
				done();
			}
			
			resampler.processBatch(data);
		})
		.catch((err) => {
			throw err;
		});
});