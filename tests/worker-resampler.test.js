import WorkerResampler from '../src/worker-resampler';

beforeAll(() => {
	// shut console.log up
	const consoleLog = global.console.log;
	global.console = { log: jest.fn() }
});

test('processBatch invokes worker.postMessage', () => {
	let resampler = new WorkerResampler(44100, 44100, 1, () => {});

	const spy = jest.spyOn(resampler.worker, 'postMessage');
	resampler.processBatch(new Float32Array(128));
	expect(spy).toHaveBeenCalledTimes(1);
});

test('_onMessage correctly invokes callback', (done) => {
	const cb = (data) => {
		expect(JSON.stringify(data)).toBe(JSON.stringify(new Float32Array(0)));
		done();
	}

	let resampler = new WorkerResampler(44100, 44100, 1, cb);

	resampler.worker.onmessage({data: new Float32Array(0)});
});

test('sends connect command if port != undefined', () => {
	// we need to watch console.log calls, so reset it
	const consoleLog = global.console.log;
	global.console = { log: jest.fn() }
	const spy = jest.spyOn(global.console, 'log');

	let resampler = new WorkerResampler(44100, 44100, 1, () => {}, {});

	expect(spy).toHaveBeenCalledTimes(2);

	global.console = { log: consoleLog }; // reset console.log
});