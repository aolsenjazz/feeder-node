import 'web-audio-test-api';
import 'babel-polyfill';
import AudioWorkletBackend from '../src/audio-worklet-backend';
const waitForExpect = require('wait-for-expect')

class MockAudioWorkletNode {

	constructor() {
		this.connectCalled = false;
		this.port = {
			postMessage: (e) => {
				if (e.command === 'connect') {

					this.connectCalled = true;
				}
			}
		}
	}

	addModule(path) {
		return new Promise((resolve, reject) => {
			resolve();
		});
	}

	connect() {

	}
}

global.AudioWorkletNode = MockAudioWorkletNode;

test('feed calls postMessage', async () => {
	let con = new AudioContext();

	con.audioWorklet = new MockAudioWorkletNode();

	let awb = new AudioWorkletBackend(con, 128, 2, 1024, 4096, () => {}, undefined, '/randoPath');

	awb.connect(con.createGain());

	await waitForExpect(() => {
		const spy = jest.spyOn(awb.audioNode.port, 'postMessage');	
		awb.feed(new Float32Array([1,2,3]));
		expect(spy).toHaveBeenCalledTimes(1);
	});
});

test('disconnect calls audioNode.disconnect', () => {
	let con = new AudioContext();

	con.audioWorklet = new MockAudioWorkletNode();

	let awb = new AudioWorkletBackend(con, 128, 2, 1024, 4096, () => {}, undefined, '/randoPath');
	awb.audioNode = {
		disconnect: () => {}
	}

	const spy = jest.spyOn(awb.audioNode, 'disconnect');	
	awb.disconnect();
	expect(spy).toHaveBeenCalledTimes(1);
});

test('calling _onMessage command bufferLengthChange changes buffer length', () => {
	let con = new AudioContext();

	con.audioWorklet = new MockAudioWorkletNode();

	let awb = new AudioWorkletBackend(con, 128, 2, 1024, 4096, () => {}, undefined, '/randoPath');

	awb._onMessage({data: {command: 'bufferLengthChange', bufferLength: 420}});

	expect(awb.bufferLength).toBe(420);
});

test('calling _onMessage unknown command throws', () => {
	let con = new AudioContext();

	con.audioWorklet = new MockAudioWorkletNode();

	let awb = new AudioWorkletBackend(con, 128, 2, 1024, 4096, () => {}, undefined, '/randoPath');

	expect(() => {
		awb._onMessage({data: {command: 'rando', bufferLength: 420}});
	}).toThrow('command rando unrecognized');
});

test('connecting the backend while port !== undefined sends a connect command', async () => {
	let con = new AudioContext();

	con.audioWorklet = new MockAudioWorkletNode();

	let awb = new AudioWorkletBackend(con, 128, 2, 1024, 4096, () => {}, {postMessage: () => {}}, '/randoPath');

	awb.connect(con.createGain());

	await waitForExpect(() => {
		expect(awb.audioNode.connectCalled).toBe(true);
	});
});

test('connecting the backend while port === undefined doesnt send a connect command', async () => {
	let con = new AudioContext();

	con.audioWorklet = new MockAudioWorkletNode();

	let awb = new AudioWorkletBackend(con, 128, 2, 1024, 4096, () => {}, undefined, '/randoPath');

	awb.connect(con.createGain());

	await waitForExpect(() => {
		expect(awb.audioNode.connectCalled).toBe(false);
	});
});

test('calling _onMessage command stateChange changes calls _stateChangeCb', () => {
	let con = new AudioContext();

	con.audioWorklet = new MockAudioWorkletNode();
	let called = false;

	let awb = new AudioWorkletBackend(con, 128, 2, 1024, 4096,() => {
		called = true;
	}, '/randoPath');

	awb._onMessage({data: {command: 'stateChange'}});

	expect(called).toBe(true);
});