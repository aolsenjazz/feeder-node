import 'web-audio-test-api';
import { BackendState } from '../src/abstract-backend';
import ScriptProcessorBackend from 'SCRIPT_PROCESSOR_BACKEND';

test('calling _playNext with nothing in buffer writes silence', () => {
	let con = new AudioContext();
	let nChannels = 2;
	let batchSize = 512;
	let bufferLength = 192000;
	let bufferThreshold = 4096;

	let spr = new ScriptProcessorBackend(con, nChannels, batchSize, bufferLength, bufferThreshold);

	let data = new Float32Array(batchSize);

	for (let i = 0; i < batchSize; i++) {
		data[i] = i;
	}

	let aprMock = {
		outputBuffer: {
			getChannelData: () => {
				return data;
			}
		}
	}

	spr._playNext(aprMock);

	let correct = new Float32Array(batchSize);

	expect(JSON.stringify(data)).toBe(JSON.stringify(correct));
});

test('calling _playNext writes data correctly when state === PLAYING', () => {
	let con = new AudioContext();
	let nChannels = 2;
	let batchSize = 512;
	let bufferLength = 192000;
	let bufferThreshold = 4096;

	let spr = new ScriptProcessorBackend(con, nChannels, batchSize, bufferLength, bufferThreshold);

	spr._updateState = () => {
		spr.state = BackendState.PLAYING;
	}

	let correct = new Float32Array(batchSize);
	for (let i = 0; i < correct.length; i++) {
		correct[i] = i;
	}

	// interleave data and feed to backend
	let interleaved = new Float32Array(1024);
	let nonInterleavedPos = 0;
	for (let i = 0; i < interleaved.length; i++) {
		if (i % 2 === 0 && i != 0) {
			nonInterleavedPos++;
		}
		interleaved[i] = correct[nonInterleavedPos];
	}
	spr.feed(interleaved);

	// mock the object passed to _playnext
	let data = new Float32Array(batchSize);
	let aprMock = {
		outputBuffer: {
			getChannelData: () => {
				return data;
			}
		}
	}

	spr._playNext(aprMock);

	expect(JSON.stringify(data)).toBe(JSON.stringify(correct));
});

test('writing large chunk resizes and reports correct new buffer length', () => {
	let con = new AudioContext();
	let nChannels = 1;
	let batchSize = 512;
	let bufferLength = 192000;
	let bufferThreshold = 4096;

	let spr = new ScriptProcessorBackend(con, nChannels, batchSize, bufferLength, bufferThreshold);

	let data = new Float32Array(193000);

	spr.feed(data);

	expect(spr.bufferLength).toBe(193000);
});

test('updating state to UNINITIALIZED returns without notifying', () => {
	let con = new AudioContext();
	let nChannels = 2;
	let batchSize = 512;
	let bufferLength = 192000;
	let bufferThreshold = 4096;

	let spr = new ScriptProcessorBackend(con, nChannels, batchSize, bufferLength, bufferThreshold);

	const spy = jest.spyOn(spr, 'onStateChange');

	spr.state = BackendState.UNINITIALIZED;
	spr._updateState();

	expect(spy).toHaveBeenCalledTimes(0);
});

test('running out of samples causes backend to move to starved state', () => {
	let con = new AudioContext();
	let nChannels = 2;
	let batchSize = 512;
	let bufferLength = 192000;
	let bufferThreshold = 4096;

	let spr = new ScriptProcessorBackend(con, nChannels, batchSize, bufferLength, bufferThreshold);

	spr.onStateChange = (state) => {
		expect(spr.state).toBe(BackendState.STARVED);
	}

	spr.state = BackendState.PLAYING;

	spr._buffer = {
		getNReadableSamples: () => { return 0 }
	}

	spr._updateState();
});

test('having > bufferThreshold samples moves READY state to PLAYING', () => {
	let con = new AudioContext();
	let nChannels = 2;
	let batchSize = 512;
	let bufferLength = 192000;
	let bufferThreshold = 4096;

	let spr = new ScriptProcessorBackend(con, nChannels, batchSize, bufferLength, bufferThreshold);

	spr.onStateChange = (state) => {}

	spr.state = BackendState.READY;
	spr.bufferThreshold = 4096;

	spr._buffer = {
		getNReadableSamples: () => { return 10000 }
	}

	spr._updateState();
	expect(spr.state).toBe(BackendState.PLAYING);
});

test('have > bufferThreshold samples moves STARVED state to PLAYING', () => {
	let con = new AudioContext();
	let nChannels = 2;
	let batchSize = 512;
	let bufferLength = 192000;
	let bufferThreshold = 4096;

	let spr = new ScriptProcessorBackend(con, nChannels, batchSize, bufferLength, bufferThreshold);

	spr.onStateChange = () => {}

	spr.state = BackendState.STARVED;
	spr.bufferThreshold = 4096;

	spr._buffer = {
		getNReadableSamples: () => { return 10000 }
	}

	spr._updateState();
	expect(spr.state).toBe(BackendState.PLAYING);
});

test('calling _updateState with undefined state causes switch default, doesnt notify', () => {
	let con = new AudioContext();
	let nChannels = 2;
	let batchSize = 512;
	let bufferLength = 192000;
	let bufferThreshold = 4096;

	let spr = new ScriptProcessorBackend(con, nChannels, batchSize, bufferLength, bufferThreshold);
	let notified = false;
	spr.state = undefined;

	spr.onStateChange = () => {
		notified = true;
	}

	spr._buffer = {
		getNReadableSamples: () => { return 10000 }
	}

	spr._updateState();
	expect(notified).toBe(false);
});

test('calling _updateState with PLAYING state and enough samples doesnt change state', () => {
	let con = new AudioContext();
	let nChannels = 2;
	let batchSize = 512;
	let bufferLength = 192000;
	let bufferThreshold = 4096;

	let spr = new ScriptProcessorBackend(con, nChannels, batchSize, bufferLength, bufferThreshold);
	let notified = false;
	spr.state = BackendState.PLAYING;

	spr.onStateChange = () => {
		notified = true;
	}

	spr._buffer = {
		getNReadableSamples: () => { return 10000 }
	}

	spr._updateState();
	expect(notified).toBe(false);
});

test('connect() call audioNode.connect()', () => {
	let con = new AudioContext();
	let nChannels = 2;
	let batchSize = 512;
	let bufferLength = 192000;
	let bufferThreshold = 4096;

	let spr = new ScriptProcessorBackend(con, nChannels, batchSize, bufferLength, bufferThreshold);
	spr.audioNode.connect = jest.fn();

	let spy = jest.spyOn(spr.audioNode, 'connect');

	spr.connect('something');

	expect(spy).toHaveBeenCalledTimes(1);
});

test('disconnect() call audioNode.disconnect()', () => {
	let con = new AudioContext();
	let nChannels = 2;
	let batchSize = 512;
	let bufferLength = 192000;
	let bufferThreshold = 4096;

	let spr = new ScriptProcessorBackend(con, nChannels, batchSize, bufferLength, bufferThreshold);
	spr.audioNode.disconnect = jest.fn();

	let spy = jest.spyOn(spr.audioNode, 'disconnect');

	spr.disconnect('something');

	expect(spy).toHaveBeenCalledTimes(1);
});