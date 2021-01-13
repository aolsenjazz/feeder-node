import 'web-audio-test-api';
import 'babel-polyfill';
import FeederNode from '../src/feeder-node';
import mockConsole from 'jest-mock-console';
import { BackendState } from '../src/abstract-backend';

const waitForExpect = require('wait-for-expect');

class MessageChannel {
	constructor() {
		this.port1 = {
			postMessage: () => {}
		};
		this.port2 = {
			postMessage: () => {}
		};
	}
}
global.MessageChannel = MessageChannel;

beforeAll(() => {
	// shut console.log up
	const consoleLog = global.console.log;
	global.console = { log: jest.fn() }
});

test('Backend defaults to ScriptProcessor', () => {
	let con = new AudioContext();
	let fn = new FeederNode(con);
	expect(fn._backend.constructor.name).toBe('ScriptProcessorBackend');
});

test('Backend uses AudioWorklet if available', () => {
	global.AudioWorklet = 'something';

	let con = new AudioContext();
	let fn = new FeederNode(con);

	expect(fn._backend.constructor.name).toBe('AudioWorkletBackend');

	global.AudioWorklet = undefined;
});

test('connecting to destination is successful', () => {
	let con = new AudioContext();
	let fn = new FeederNode(con);

	fn.connect(con.destination);
});

test('bufferLength return correct size with ScriptProcessorBackend', () => {
	let size = 100000;

	let con = new AudioContext();
	let fn = new FeederNode(con, { bufferLength: size });

	expect(fn.bufferLength).toBe(size);
});

test('setting batchSize with ScriptProcessor to bad value throws', () => {
	let size = 100000;

	let con = new AudioContext();

	expect(() => {
		let fn = new FeederNode(con, { batchSize: size });
	}).toThrow('The bufferSize should be one of [ 256, 512, 1024, 2048, 4096, 8192, 16384 ], but got 100000.');
});

test('setting batchSize with Script processor works', () => {
	let size = 256;

	let con = new AudioContext();

	let fn = new FeederNode(con, { batchSize: size });
	
	expect(fn.batchSize).toBe(size);
});

test('setting batchSize with WorkletProcessor warns', () => {
	let size = 256;
	global.AudioWorklet = 'something';
	const restoreConsole = mockConsole();

	let con = new AudioContext();

	let fn = new FeederNode(con, { batchSize: size });
	
	expect(console.warn).toBeCalled();
	restoreConsole();
	global.AudioWorklet = undefined;
});

test('get nChannels works for ScriptProcessor', () => {
	let con = new AudioContext();

	let fn = new FeederNode(con);

	expect(fn.nChannels).toBe(2);
});

test('get nChannels works for AudioWorklet', () => {
	let con = new AudioContext();
	global.AudioWorklet = 'something';

	let fn = new FeederNode(con);

	expect(fn.nChannels).toBe(2);
	global.AudioWorklet = undefined;
});

test('disconnnect calls ScriptProcessor disconnect', () => {
	let con = new AudioContext();

	let fn = new FeederNode(con);

	const spy = jest.spyOn(fn._backend, 'disconnect');

	fn.disconnect();

	expect(spy).toBeCalled();
	spy.mockRestore();
});

test('disconnnect calls AudioWorklet disconnect', () => {
	let con = new AudioContext();
	global.AudioWorklet = 'something';

	let fn = new FeederNode(con);

	const spy = jest.spyOn(fn._backend, 'disconnect');

	fn.disconnect();

	expect(spy).toBeCalled();
	spy.mockRestore();
	global.AudioWorklet = undefined;
});

test('feed feeds data to ScriptProcessor', () => {
	let con = new AudioContext();
	let fn = new FeederNode(con, {bufferLength: 3});

	let data = new Float32Array([1,1,2,2,3,3]);

	const spy = jest.spyOn(fn._resampler, 'processBatch');

	fn.feed(data);

	expect(spy).toHaveBeenCalledTimes(1);
});

test('feeding an array of Float32Arrays throws', () => {
	let con = new AudioContext();
	let fn = new FeederNode(con, {bufferLength: 3});

	let data = new Float32Array([1,1,2,2,3,3]);

	

	expect(() => {
		fn.feed([data, data]);
	}).toThrow('FeederNode.feed() must receive an instance of TypedArray. You passed function Array() { [native code] }');
});

test('Resampler defaults to WorkerResampler', () => {
	let con = new AudioContext();
	let fn = new FeederNode(con);
	expect(fn._resampler.constructor.name).toBe('WorkerResampler');
});

test('setting resampleAsync to false forces MainThreadResampler', () => {
	let con = new AudioContext();
	let fn = new FeederNode(con, {resampleAsync: false});
	expect(fn._resampler.constructor.name).toBe('MainThreadResampler');
});

test('onResampleComplete() passes data to backend', () => {
	let con = new AudioContext();
	let fn = new FeederNode(con, {resampleAsync: false});
	
	let received = false;

	fn._backend = {
		feed: () => {
			received = true;
		}
	}

	fn._onResampleComplete();

	expect(received).toBe(true);
});

test('received backendStateChange(READY) calls ready callback', () => {
	let con = new AudioContext();
	let fn = new FeederNode(con);

	const spy = jest.spyOn(fn, 'onBackendReady');

	fn._onBackendStateChange(BackendState.READY);

	expect(spy).toHaveBeenCalledTimes(1);
});

test('received backendStateChange(STARVED) calls starved callback', () => {
	let con = new AudioContext();
	let fn = new FeederNode(con);

	const spy = jest.spyOn(fn, 'onBackendStarved');

	fn._onBackendStateChange(BackendState.STARVED);

	expect(spy).toHaveBeenCalledTimes(1);
});

test('received backendStateChange(PLAYING) calls playing callback', () => {
	let con = new AudioContext();
	let fn = new FeederNode(con);

	const spy = jest.spyOn(fn, 'onBackendPlaying');

	fn._onBackendStateChange(BackendState.PLAYING);

	expect(spy).toHaveBeenCalledTimes(1);
});

test('received backendStateChange(undefined) throws', () => {
	let con = new AudioContext();
	let fn = new FeederNode(con);

	expect(() => {
		fn._onBackendStateChange();
	}).toThrow('unknown state undefined');
});