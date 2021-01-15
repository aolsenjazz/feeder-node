import 'web-audio-test-api';
import 'babel-polyfill';

import FeederNode from '../src/feeder-node';
import ScriptProcessorBackend from './script-processor-backend';
import MainThreadResampler from './main-thread-resampler';
import createAudioWorklet from './audio-worklet-backend';
import createWorkerResampler from './worker-resampler';

import { BackendState } from '../src/abstract-backend';

class MessageChannelMock {

}
global.MessageChannel = MessageChannelMock;

test('creating with WorkletBackend and WorkerProcessor creates a messagechannel', async () => {
	let resampler = await createWorkerResampler();
	let backend = await createAudioWorklet();

	let spy = jest.spyOn(resampler, 'setPort');

	let feederNode = new FeederNode(resampler, backend);

	expect(spy).toHaveBeenCalledTimes(1);
});

test('creating with WorkletBackend & MainThreadResampler doesnt create a messagechannel', async () => {
	let resampler = new MainThreadResampler();
	let backend = await createAudioWorklet();

	let spy = jest.spyOn(backend, 'setPort');

	let feederNode = new FeederNode(resampler, backend);

	expect(spy).toHaveBeenCalledTimes(0);
});

test('creating with WorkerResampler & ScriptProcessorBackend doesnt create a messagechannel', async () => {
	let resampler = await createWorkerResampler();
	let backend = new ScriptProcessorBackend();

	let spy = jest.spyOn(resampler, 'setPort');

	let feederNode = new FeederNode(resampler, backend);

	expect(spy).toHaveBeenCalledTimes(0);
});

test('creating with MainThreadResampler and ScriptProcessorBackend doesnt create a messagechannel', () => {
	let resampler = new MainThreadResampler();
	let backend = new ScriptProcessorBackend();

	let spy = jest.spyOn(resampler, 'setPort');

	let feederNode = new FeederNode(resampler, backend);

	expect(spy).toHaveBeenCalledTimes(0);
});

test('bufferLength returns the backends bufferLength', () => {
	let resampler = new MainThreadResampler();
	let backend = new ScriptProcessorBackend();

	let feederNode = new FeederNode(resampler, backend);

	backend.bufferLength = 10000;

	expect(feederNode.bufferLength).toBe(10000);
});

test('nChannels returns the backends nChannels', () => {
	let resampler = new MainThreadResampler();
	let backend = new ScriptProcessorBackend();

	let feederNode = new FeederNode(resampler, backend);

	backend.nChannels = 10000;

	expect(feederNode.nChannels).toBe(10000);
});

test('batchSize returns the backends batchSize', () => {
	let resampler = new MainThreadResampler();
	let backend = new ScriptProcessorBackend();

	let feederNode = new FeederNode(resampler, backend);

	backend.batchSize = 10000;

	expect(feederNode.batchSize).toBe(10000);
});

test('connect() calls _backend.connect()', () => {
	let resampler = new MainThreadResampler();
	let backend = new ScriptProcessorBackend();

	let feederNode = new FeederNode(resampler, backend);

	let spy = jest.spyOn(feederNode._backend, 'connect');

	feederNode.connect('something');

	expect(spy).toHaveBeenCalledTimes(1);
});

test('disconnect() calls _backend.disconnect()', () => {
	let resampler = new MainThreadResampler();
	let backend = new ScriptProcessorBackend();

	let feederNode = new FeederNode(resampler, backend);

	let spy = jest.spyOn(feederNode._backend, 'disconnect');

	feederNode.disconnect();

	expect(spy).toHaveBeenCalledTimes(1);
});

test('feed() with non-typed-array throws', () => {
	let resampler = new MainThreadResampler();
	let backend = new ScriptProcessorBackend();

	let feederNode = new FeederNode(resampler, backend);

	expect(() => {
		feederNode.feed([]);
	}).toThrow('FeederNode.feed() must receive an instance of TypedArray. You passed Array');
});

test('feed() with typed-array calls _resampler.processBatch', () => {
	let resampler = new MainThreadResampler();
	let backend = new ScriptProcessorBackend();

	let feederNode = new FeederNode(resampler, backend);

	let spy = jest.spyOn(feederNode._resampler, 'processBatch');

	feederNode.feed(new Float32Array(2));

	expect(spy).toHaveBeenCalledTimes(1);
});

test('_resampleComplete() passes data to _backend.feed', (done) => {
	let resampler = new MainThreadResampler();
	let backend = new ScriptProcessorBackend();

	let feederNode = new FeederNode(resampler, backend);
	let data = new Float32Array([1,2,3,4]);

	feederNode._backend.feed = (d) => {
		expect(JSON.stringify(d)).toBe(JSON.stringify(data));
		done();
	}

	feederNode._onResampleComplete(data);
});

test('_onBackendStateChange(BackendState.READY) calls onBackendReady()', () => {
	let resampler = new MainThreadResampler();
	let backend = new ScriptProcessorBackend();

	let feederNode = new FeederNode(resampler, backend);

	let spy = jest.spyOn(feederNode, 'onBackendReady');

	feederNode._onBackendStateChange(BackendState.READY);

	expect(spy).toHaveBeenCalledTimes(1);
});

test('_onBackendStateChange(BackendState.STARVED) calls onBackendStarved()', () => {
	let resampler = new MainThreadResampler();
	let backend = new ScriptProcessorBackend();

	let feederNode = new FeederNode(resampler, backend);

	let spy = jest.spyOn(feederNode, 'onBackendStarved');

	feederNode._onBackendStateChange(BackendState.STARVED);

	expect(spy).toHaveBeenCalledTimes(1);
});

test('_onBackendStateChange(BackendState.PLAYING) calls onBackendPlaying()', () => {
	let resampler = new MainThreadResampler();
	let backend = new ScriptProcessorBackend();

	let feederNode = new FeederNode(resampler, backend);

	let spy = jest.spyOn(feederNode, 'onBackendPlaying');

	feederNode._onBackendStateChange(BackendState.PLAYING);

	expect(spy).toHaveBeenCalledTimes(1);
});

test('_onBackendStateChange(100) throws', () => {
	let resampler = new MainThreadResampler();
	let backend = new ScriptProcessorBackend();

	let feederNode = new FeederNode(resampler, backend);

	expect(() => {
		feederNode._onBackendStateChange(100);
	}).toThrow('unknown state 100');
});
