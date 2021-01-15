import 'web-audio-test-api';
import 'babel-polyfill';
import { BackendState } from '../src/abstract-backend';

class MockAudioWorkletProcessor {

	constructor() {
		this.port = {
			onmessage: () => {},
			postMessage: () => {},
		}
	}
}

global.AudioWorkletProcessor = MockAudioWorkletProcessor;
global.registerProcessor = () => {}

test('init passes values correctly', () => {
	const WorkletProcessor = require('../src/feeder-node.worklet.js');

	let wp = new WorkletProcessor.default();

	wp.port.onmessage({
		data: {
			command: 'init',
			bufferLength: 100,
			nChannels: 1
		}
	});

	expect(wp._buffer.bufferLength).toBe(100);
	expect(wp._buffer._nChannels).toBe(1);
});

test('passing incorrect command throws', () => {
	const WorkletProcessor = require('../src/feeder-node.worklet.js');

	let wp = new WorkletProcessor.default();

	expect(() => {
		wp.port.onmessage({
			data: {
				command: 'bad',
			}
		});
	}).toThrow('command not specified');
});

test('feed() feeds data correctly', () => {
	const WorkletProcessor = require('../src/feeder-node.worklet.js');

	let wp = new WorkletProcessor.default();

	wp.port.onmessage({
		data: {
			command: 'init',
			bufferLength: 4,
			nChannels: 1
		}
	});

	wp.port.onmessage({
		data: {
			command: 'feed',
			data: new Float32Array([1,2,3,4])
		}
	});

	expect(JSON.stringify(wp._buffer._data[0])).toBe(JSON.stringify(new Float32Array([1,2,3,4])));
});

test('process with empty buffer fills with silence', () => {
	const WorkletProcessor = require('../src/feeder-node.worklet.js');

	let wp = new WorkletProcessor.default();

	wp.port.onmessage({
		data: {
			command: 'init',
			bufferLength: 4,
			nChannels: 1
		}
	});

	let outputs = [[new Float32Array(128)]];

	for (let i = 0; i < outputs[0][0].length; i++) {
		outputs[0][0][i] = i;
	}

	wp.process(null, outputs);

	let expected = new Float32Array(128);

	expect(JSON.stringify(outputs[0][0])).toBe(JSON.stringify(expected));
});

test('process fills buffer when in PLAYING state', () => {
	const WorkletProcessor = require('../src/feeder-node.worklet.js');

	let wp = new WorkletProcessor.default();

	wp.port.onmessage({
		data: {
			command: 'init',
			bufferLength: 256,
			nChannels: 1
		}
	});

	wp._updateState = () => {
		wp.state = BackendState.PLAYING;
	}

	let expected = new Float32Array(128);

	for (let i = 0; i < expected.length; i++) {
		expected[i] = i;
	}

	wp._feed(expected);

	let outputs = [[new Float32Array(128)]];

	wp.process(null, outputs);

	expect(JSON.stringify(outputs[0][0])).toBe(JSON.stringify(expected));
});

test('buffer resizing correctly notifies main thread', () => {
	const WorkletProcessor = require('../src/feeder-node.worklet.js');

	let wp = new WorkletProcessor.default();

	wp.port.onmessage({
		data: {
			command: 'init',
			bufferLength: 256,
			nChannels: 1
		}
	});

	const spy = jest.spyOn(wp.port, 'postMessage');
	wp._feed(new Float32Array(512));

	expect(spy).toHaveBeenCalledTimes(1);
});

test('calling process() before init just returns true', () => {
	const WorkletProcessor = require('../src/feeder-node.worklet.js');

	let wp = new WorkletProcessor.default();

	expect(wp.process(null, [new Float32Array(512), new Float32Array(512)])).toBe(true);
});

test('sending connect command binds _onMessage to ports[0].onmessage', () => {
	const WorkletProcessor = require('../src/feeder-node.worklet.js');

	let wp = new WorkletProcessor.default();

	const spy = jest.spyOn(wp._onMessage, 'bind');

	wp.port.onmessage({
		data: {
			command: 'connect',
		},
		ports: [{}]
	});

	expect(spy).toHaveBeenCalledTimes(1);
	
});

test('updating state to UNINITIALIZED returns without notifying', () => {
	const WorkletProcessor = require('../src/feeder-node.worklet.js');

	let wp = new WorkletProcessor.default();

	const spy = jest.spyOn(wp, '_notifyStateChange');

	wp.state = BackendState.UNINITIALIZED;
	wp._updateState();

	expect(spy).toHaveBeenCalledTimes(0);
});

test('running out of samples causes backend to move to starved state', () => {
	const WorkletProcessor = require('../src/feeder-node.worklet.js');

	let wp = new WorkletProcessor.default();

	wp._notifyStateChange = (state) => {
		expect(wp.state).toBe(BackendState.STARVED);
	}

	wp.state = BackendState.PLAYING;

	wp._buffer = {
		getNReadableSamples: () => { return 0 }
	}

	wp._updateState();
});

test('have > bufferThreshold samples moves READY state to PLAYING', () => {
	const WorkletProcessor = require('../src/feeder-node.worklet.js');

	let wp = new WorkletProcessor.default();

	wp._notifyStateChange = (state) => {}

	wp.state = BackendState.READY;
	wp.bufferThreshold = 4096;

	wp._buffer = {
		getNReadableSamples: () => { return 10000 }
	}

	wp._updateState();
	expect(wp.state).toBe(BackendState.PLAYING);
});

test('have > bufferThreshold samples moves STARVED state to PLAYING', () => {
	const WorkletProcessor = require('../src/feeder-node.worklet.js');

	let wp = new WorkletProcessor.default();

	wp._notifyStateChange = () => {}

	wp.state = BackendState.STARVED;
	wp.bufferThreshold = 4096;

	wp._buffer = {
		getNReadableSamples: () => { return 10000 }
	}

	wp._updateState();
	expect(wp.state).toBe(BackendState.PLAYING);
});

test('calling _updateState with undefined state causes switch default, doesnt notify', () => {
	const WorkletProcessor = require('../src/feeder-node.worklet.js');

	let wp = new WorkletProcessor.default();
	let notified = false;
	wp.state = undefined;

	wp._notifyStateChange = () => {
		notified = true;
	}

	wp._buffer = {
		getNReadableSamples: () => { return 10000 }
	}

	wp._updateState();
	expect(notified).toBe(false);
});

test('calling _updateState with PLAYING state and enough samples doesnt change state', () => {
	const WorkletProcessor = require('../src/feeder-node.worklet.js');

	let wp = new WorkletProcessor.default();
	let notified = false;
	wp.state = BackendState.PLAYING;

	wp._notifyStateChange = () => {
		notified = true;
	}

	wp._buffer = {
		getNReadableSamples: () => { return 10000 }
	}

	wp._updateState();
	expect(notified).toBe(false);
});

test('calling _notifyStateChange calls callback', () => {
	const WorkletProcessor = require('../src/feeder-node.worklet.js');

	let wp = new WorkletProcessor.default();
	let notified = false;
	wp.state = BackendState.PLAYING;
	wp.port.postMessage = () => {
		notified = true;
	}

	wp._notifyStateChange();
	expect(notified).toBe(true);
});
