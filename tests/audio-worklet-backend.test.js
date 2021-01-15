import 'web-audio-test-api';
import 'babel-polyfill';
import createAudioWorklet from 'AUDIO_WORKLET_BACKEND';
import { BackendState } from '../src/abstract-backend';

class AudioWorkletNode {
	connect(destination) {

	}

	disconnect() {

	}

	addModule(path) {
		this.path = path;
	}

	port = {
		postMessage: (data) => {
			if (data.command === 'connect') {
				this.connected = true;
			} else if (data.command === 'bufferLengthChange') {
				this.port.onmessage({data: { command: 'bufferLengthChange', bufferLength: data.bufferLength }});
			} else if (data.command === 'stateChange') {
				this.port.onmessage({data: { command: 'stateChange', state: data.state }})
			} else if (data.command === 'bad command') {
				this.port.onmessage({data: { command: 'bad command' }});
			}
		},

		// gets overridden
		onmessage: (data) => {}
	}
}
global.AudioWorkletNode = AudioWorkletNode;

AudioContext.prototype.audioWorklet = {};
AudioContext.prototype.audioWorklet.addModule = async (path) => {}

test('creating a new AudioWorkletBackend sets params correctly', (done) => {
	let context = new AudioContext();

	let nChannels = 2;
	let bufferLength = 192000;
	let bufferThreshold = 4096;
	let pathToWorklet = '/feeder-node.worklet.js;';

	createAudioWorklet(context, nChannels, bufferLength, bufferThreshold, pathToWorklet)
		.then((backend) => {
			expect(backend.nChannels).toBe(nChannels);
			expect(backend.bufferLength).toBe(bufferLength);

			done();
		});
});

test ('calling feed() on uninitialized backend warns', (done) => {
	let context = new AudioContext();

	let nChannels = 2;
	let bufferLength = 192000;
	let bufferThreshold = 4096;
	let pathToWorklet = '/feeder-node.worklet.js;';

	let consoleWarn = global.console.warn;
	global.console.warn = jest.fn(); // shut console.warn up
	let spy = jest.spyOn(global.console, 'warn');

	createAudioWorklet(context, nChannels, bufferLength, bufferThreshold, pathToWorklet)
		.then((backend) => {
			backend.state = BackendState.UNINITIALIZED;
			backend.feed(new Float32Array(10));

			expect(spy).toHaveBeenCalledTimes(1);
			global.console.warn = consoleWarn; // reset console.warn
			done();
		});
});

test ('calling feed() on initialized backend sends correct data to audioNode', (done) => {
	let context = new AudioContext();

	let nChannels = 2;
	let bufferLength = 192000;
	let bufferThreshold = 4096;
	let pathToWorklet = '/feeder-node.worklet.js;';

	let array = new Float32Array([1,2,3,4]);

	createAudioWorklet(context, nChannels, bufferLength, bufferThreshold, pathToWorklet)
		.then((worklet) => {
			worklet.audioNode = {port: {}};
			worklet.audioNode.port.postMessage = (data) => {
				expect(data.command).toBe('feed');
				expect(JSON.stringify(data.data)).toBe(JSON.stringify(array));
				done();
			}

			worklet.feed(array);
		});
});

test('setPort() passes connect command to audio thread', (done) => {
	let context = new AudioContext();

	let nChannels = 2;
	let bufferLength = 192000;
	let bufferThreshold = 4096;
	let pathToWorklet = '/feeder-node.worklet.js;';

	createAudioWorklet(context, nChannels, bufferLength, bufferThreshold, pathToWorklet)
		.then((backend) => {
			backend.setPort('yo momma');
			expect(backend.audioNode.connected).toBe(true);
			done();
		});
});

test('disconnect() calls audioNode disconnect()', (done) => {
	let context = new AudioContext();

	let nChannels = 2;
	let bufferLength = 192000;
	let bufferThreshold = 4096;
	let pathToWorklet = '/feeder-node.worklet.js;';

	createAudioWorklet(context, nChannels, bufferLength, bufferThreshold, pathToWorklet)
		.then((worklet) => {
			let spy = jest.spyOn(worklet.audioNode, 'disconnect');
			worklet.disconnect();

			expect(spy).toHaveBeenCalledTimes(1);

			done();
		});
});

test('connect() calls audioNode.connect()', (done) => {
	let context = new AudioContext();

	let nChannels = 2;
	let bufferLength = 192000;
	let bufferThreshold = 4096;
	let pathToWorklet = '/feeder-node.worklet.js;';

	createAudioWorklet(context, nChannels, bufferLength, bufferThreshold, pathToWorklet)
		.then((worklet) => {
			let spy = jest.spyOn(worklet.audioNode, 'connect');
			worklet.connect();

			expect(spy).toHaveBeenCalledTimes(1);

			done();
		});
});

test('audioNode.port.onmessage command bufferLengthChange updates bufferlength', (done) => {
	let context = new AudioContext();

	let nChannels = 2;
	let bufferLength = 192000;
	let bufferThreshold = 4096;
	let pathToWorklet = '/feeder-node.worklet.js;';

	createAudioWorklet(context, nChannels, bufferLength, bufferThreshold, pathToWorklet)
		.then((worklet) => {
			worklet.audioNode.port.postMessage({command: 'bufferLengthChange', bufferLength: 1024 });
			expect(worklet.bufferLength).toBe(1024);
			done();
		});
});

test('audioNode.port.onmessage command stateChange calls onStateChange', (done) => {
	let context = new AudioContext();

	let nChannels = 2;
	let bufferLength = 192000;
	let bufferThreshold = 4096;
	let pathToWorklet = '/feeder-node.worklet.js;';

	createAudioWorklet(context, nChannels, bufferLength, bufferThreshold, pathToWorklet)
		.then((worklet) => {
			worklet.onStateChange = jest.fn();
			let spy = jest.spyOn(worklet, 'onStateChange');
			worklet.audioNode.port.postMessage({command: 'stateChange', state: 102 });
			expect(spy).toHaveBeenCalledTimes(1);
			done();
		});
});

test('audioNode.port.onmessage bad command throws', async () => {
	let context = new AudioContext();

	let nChannels = 2;
	let bufferLength = 192000;
	let bufferThreshold = 4096;
	let pathToWorklet = '/feeder-node.worklet.js;';

	let worklet = await createAudioWorklet(context, nChannels, bufferLength, bufferThreshold, pathToWorklet);
	
	expect(() => {
		worklet.audioNode.port.postMessage({command: 'bad command' });
	}).toThrow('command bad command unrecognized');
});
