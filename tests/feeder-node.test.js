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
	let ctx = new AudioContext();
	let nChannels = 2;
	let batchSize = 512;
	let bufferLength = 192000;
	let bufferThreshold = 16384;

	let resampler = await createWorkerResampler();
	let backend = await createAudioWorklet();

	let spy = jest.spyOn(resampler, 'setPort');

	let feederNode = new FeederNode(resampler, backend);

	expect(spy).toHaveBeenCalledTimes(1);
});

test('creating with WorkletBackend & MainThreadResampler doesnt create a messagechannel', async () => {
	let ctx = new AudioContext();
	let nChannels = 2;
	let batchSize = 512;
	let bufferLength = 192000;
	let bufferThreshold = 16384;

	let resampler = new MainThreadResampler();
	let backend = await createAudioWorklet();

	let spy = jest.spyOn(backend, 'setPort');

	let feederNode = new FeederNode(resampler, backend);

	expect(spy).toHaveBeenCalledTimes(0);
});

test('creating with WorkerResampler & ScriptProcessorBackend doesnt create a messagechannel', async () => {
	let ctx = new AudioContext();
	let nChannels = 2;
	let batchSize = 512;
	let bufferLength = 192000;
	let bufferThreshold = 16384;

	let resampler = await createWorkerResampler();
	let backend = new ScriptProcessorBackend(ctx, nChannels, batchSize, bufferLength, bufferThreshold);

	let spy = jest.spyOn(resampler, 'setPort');

	let feederNode = new FeederNode(resampler, backend);

	expect(spy).toHaveBeenCalledTimes(0);
});

test('creating with MainThreadResampler and ScriptProcessorBackend doesnt create a messagechannel', () => {
	let ctx = new AudioContext();
	let nChannels = 2;
	let batchSize = 512;
	let bufferLength = 192000;
	let bufferThreshold = 16384;

	let resampler = new MainThreadResampler();
	let backend = new ScriptProcessorBackend(ctx, nChannels, batchSize, bufferLength, bufferThreshold);

	let spy = jest.spyOn(resampler, 'setPort');

	let feederNode = new FeederNode(resampler, backend);

	expect(spy).toHaveBeenCalledTimes(0);
});

test('bufferLength returns the backends bufferLength', () => {
	let ctx = new AudioContext();
	let nChannels = 2;
	let batchSize = 512;
	let bufferLength = 192000;
	let bufferThreshold = 16384;

	let resampler = new MainThreadResampler();
	let backend = new ScriptProcessorBackend(ctx, nChannels, batchSize, bufferLength, bufferThreshold);

	let feederNode = new FeederNode(resampler, backend);

	backend.bufferLength = 10000;

	expect(feederNode.bufferLength).toBe(10000);
});

test('nChannels returns the backends nChannels', () => {
	let ctx = new AudioContext();
	let nChannels = 2;
	let batchSize = 512;
	let bufferLength = 192000;
	let bufferThreshold = 16384;

	let resampler = new MainThreadResampler();
	let backend = new ScriptProcessorBackend(ctx, nChannels, batchSize, bufferLength, bufferThreshold);

	let feederNode = new FeederNode(resampler, backend);

	backend.nChannels = 10000;

	expect(feederNode.nChannels).toBe(10000);
});

test('batchSize returns the backends batchSize', () => {
	let ctx = new AudioContext();
	let nChannels = 2;
	let batchSize = 512;
	let bufferLength = 192000;
	let bufferThreshold = 16384;

	let resampler = new MainThreadResampler();
	let backend = new ScriptProcessorBackend(ctx, nChannels, batchSize, bufferLength, bufferThreshold);

	let feederNode = new FeederNode(resampler, backend);

	backend.batchSize = 10000;

	expect(feederNode.batchSize).toBe(10000);
});

test('connect() calls _backend.connect()', () => {
	let ctx = new AudioContext();
	let nChannels = 2;
	let batchSize = 512;
	let bufferLength = 192000;
	let bufferThreshold = 16384;

	let resampler = new MainThreadResampler();
	let backend = new ScriptProcessorBackend(ctx, nChannels, batchSize, bufferLength, bufferThreshold);

	let feederNode = new FeederNode(resampler, backend);

	let spy = jest.spyOn(feederNode._backend, 'connect');

	feederNode.connect('something');

	expect(spy).toHaveBeenCalledTimes(1);
});

test('disconnect() calls _backend.disconnect()', () => {
	let ctx = new AudioContext();
	let nChannels = 2;
	let batchSize = 512;
	let bufferLength = 192000;
	let bufferThreshold = 16384;

	let resampler = new MainThreadResampler();
	let backend = new ScriptProcessorBackend(ctx, nChannels, batchSize, bufferLength, bufferThreshold);

	let feederNode = new FeederNode(resampler, backend);

	let spy = jest.spyOn(feederNode._backend, 'disconnect');

	feederNode.disconnect();

	expect(spy).toHaveBeenCalledTimes(1);
});

test('feed() with non-typed-array throws', () => {
	let ctx = new AudioContext();
	let nChannels = 2;
	let batchSize = 512;
	let bufferLength = 192000;
	let bufferThreshold = 16384;

	let resampler = new MainThreadResampler();
	let backend = new ScriptProcessorBackend(ctx, nChannels, batchSize, bufferLength, bufferThreshold);

	let feederNode = new FeederNode(resampler, backend);

	expect(() => {
		feederNode.feed([]);
	}).toThrow('FeederNode.feed() must receive an instance of TypedArray. You passed Array');
});

test('feed() with typed-array calls _resampler.processBatch', () => {
	let ctx = new AudioContext();
	let nChannels = 2;
	let batchSize = 512;
	let bufferLength = 192000;
	let bufferThreshold = 16384;

	let resampler = new MainThreadResampler();
	let backend = new ScriptProcessorBackend(ctx, nChannels, batchSize, bufferLength, bufferThreshold);

	let feederNode = new FeederNode(resampler, backend);

	let spy = jest.spyOn(feederNode._resampler, 'processBatch');

	feederNode.feed(new Float32Array(2));

	expect(spy).toHaveBeenCalledTimes(1);
});

test('_resampleComplete() passes data to _backend.feed', (done) => {
	let ctx = new AudioContext();
	let nChannels = 2;
	let batchSize = 512;
	let bufferLength = 192000;
	let bufferThreshold = 16384;

	let resampler = new MainThreadResampler();
	let backend = new ScriptProcessorBackend(ctx, nChannels, batchSize, bufferLength, bufferThreshold);

	let feederNode = new FeederNode(resampler, backend);
	let data = new Float32Array([1,2,3,4]);

	feederNode._backend.feed = (d) => {
		expect(JSON.stringify(d)).toBe(JSON.stringify(data));
		done();
	}

	feederNode._onResampleComplete(data);
});

test('_onBackendStateChange(BackendState.READY) calls onBackendReady()', () => {
	let ctx = new AudioContext();
	let nChannels = 2;
	let batchSize = 512;
	let bufferLength = 192000;
	let bufferThreshold = 16384;

	let resampler = new MainThreadResampler();
	let backend = new ScriptProcessorBackend(ctx, nChannels, batchSize, bufferLength, bufferThreshold);

	let feederNode = new FeederNode(resampler, backend);

	let spy = jest.spyOn(feederNode, 'onBackendReady');

	feederNode._onBackendStateChange(BackendState.READY);

	expect(spy).toHaveBeenCalledTimes(1);
});

test('_onBackendStateChange(BackendState.STARVED) calls onBackendStarved()', () => {
	let ctx = new AudioContext();
	let nChannels = 2;
	let batchSize = 512;
	let bufferLength = 192000;
	let bufferThreshold = 16384;

	let resampler = new MainThreadResampler();
	let backend = new ScriptProcessorBackend(ctx, nChannels, batchSize, bufferLength, bufferThreshold);

	let feederNode = new FeederNode(resampler, backend);

	let spy = jest.spyOn(feederNode, 'onBackendStarved');

	feederNode._onBackendStateChange(BackendState.STARVED);

	expect(spy).toHaveBeenCalledTimes(1);
});

test('_onBackendStateChange(BackendState.PLAYING) calls onBackendPlaying()', () => {
	let ctx = new AudioContext();
	let nChannels = 2;
	let batchSize = 512;
	let bufferLength = 192000;
	let bufferThreshold = 16384;

	let resampler = new MainThreadResampler();
	let backend = new ScriptProcessorBackend(ctx, nChannels, batchSize, bufferLength, bufferThreshold);

	let feederNode = new FeederNode(resampler, backend);

	let spy = jest.spyOn(feederNode, 'onBackendPlaying');

	feederNode._onBackendStateChange(BackendState.PLAYING);

	expect(spy).toHaveBeenCalledTimes(1);
});

test('_onBackendStateChange(100) throws', () => {
	let ctx = new AudioContext();
	let nChannels = 2;
	let batchSize = 512;
	let bufferLength = 192000;
	let bufferThreshold = 16384;

	let resampler = new MainThreadResampler();
	let backend = new ScriptProcessorBackend(ctx, nChannels, batchSize, bufferLength, bufferThreshold);

	let feederNode = new FeederNode(resampler, backend);

	expect(() => {
		feederNode._onBackendStateChange(100);
	}).toThrow('unknown state 100');
});

test('get numberOfInputs defers to backend', async () => {
	let ctx = new AudioContext();
	let nChannels = 2;
	let batchSize = 512;
	let bufferLength = 192000;
	let bufferThreshold = 16384;

	let resampler = new MainThreadResampler();
	let backend = new ScriptProcessorBackend(ctx, nChannels, batchSize, bufferLength, bufferThreshold);

	let feederNode = new FeederNode(resampler, backend);

	expect(feederNode.numberOfInputs).toBe(feederNode._backend.audioNode.numberOfInputs);
});

test('get numberOfOutputs defers to backend', async () => {
	let ctx = new AudioContext();
	let nChannels = 2;
	let batchSize = 512;
	let bufferLength = 192000;
	let bufferThreshold = 16384;

	let resampler = new MainThreadResampler();
	let backend = new ScriptProcessorBackend(ctx, nChannels, batchSize, bufferLength, bufferThreshold);

	let feederNode = new FeederNode(resampler, backend);

	expect(feederNode.numberOfOutputs).toBe(feederNode._backend.audioNode.numberOfOutputs);
});

test('get channelCount defers to backend', async () => {
	let ctx = new AudioContext();
	let nChannels = 2;
	let batchSize = 512;
	let bufferLength = 192000;
	let bufferThreshold = 16384;

	let resampler = new MainThreadResampler();
	let backend = new ScriptProcessorBackend(ctx, nChannels, batchSize, bufferLength, bufferThreshold);

	let feederNode = new FeederNode(resampler, backend);

	expect(feederNode.channelCount).toBe(feederNode._backend.audioNode.channelCount);
});

test('get channelCountMode defers to backend', async () => {
	let ctx = new AudioContext();
	let nChannels = 2;
	let batchSize = 512;
	let bufferLength = 192000;
	let bufferThreshold = 16384;

	let resampler = new MainThreadResampler();
	let backend = new ScriptProcessorBackend(ctx, nChannels, batchSize, bufferLength, bufferThreshold);

	let feederNode = new FeederNode(resampler, backend);

	expect(feederNode.channelCountMode).toBe(feederNode._backend.audioNode.channelCountMode);
});

test('get channelInterpretation defers to backend', async () => {
	let ctx = new AudioContext();
	let nChannels = 2;
	let batchSize = 512;
	let bufferLength = 192000;
	let bufferThreshold = 16384;

	let resampler = new MainThreadResampler();
	let backend = new ScriptProcessorBackend(ctx, nChannels, batchSize, bufferLength, bufferThreshold);

	let feederNode = new FeederNode(resampler, backend);

	expect(feederNode.channelInterpretation).toBe(feederNode._backend.audioNode.channelInterpretation);
});

test('set channelCount sets backend channelCount', async () => {
	let ctx = new AudioContext();
	let nChannels = 2;
	let batchSize = 512;
	let bufferLength = 192000;
	let bufferThreshold = 16384;

	let resampler = new MainThreadResampler();
	let backend = new ScriptProcessorBackend(ctx, nChannels, batchSize, bufferLength, bufferThreshold);

	let feederNode = new FeederNode(resampler, backend);

	feederNode.channelCount = 420;

	expect(feederNode._backend.audioNode.channelCount).toBe(420);
});

test('set channelCountMode sets backend channelCountMode', async () => {
	let ctx = new AudioContext();
	let nChannels = 2;
	let batchSize = 512;
	let bufferLength = 192000;
	let bufferThreshold = 16384;

	let resampler = new MainThreadResampler();
	let backend = new ScriptProcessorBackend(ctx, nChannels, batchSize, bufferLength, bufferThreshold);

	let feederNode = new FeederNode(resampler, backend);

	feederNode.channelCountMode = 'max';

	expect(feederNode._backend.audioNode.channelCountMode).toBe('max');
});

test('set channelInterpretation sets backend channelInterpretation', async () => {
	let ctx = new AudioContext();
	let nChannels = 2;
	let batchSize = 512;
	let bufferLength = 192000;
	let bufferThreshold = 16384;

	let resampler = new MainThreadResampler();
	let backend = new ScriptProcessorBackend(ctx, nChannels, batchSize, bufferLength, bufferThreshold);

	let feederNode = new FeederNode(resampler, backend);

	feederNode.channelInterpretation = 'discrete';

	expect(feederNode._backend.audioNode.channelInterpretation).toBe('discrete');
});
