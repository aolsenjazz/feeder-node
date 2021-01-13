// feeder-node.worker.js is currently mocked, so load the actual file using this alias
const WORKER_ALIAS = 'FEEDER_NODE_WORKER';

test('calling feed without message port send data back to main thread', () => {
	let postMessageCalled = false;

	global.onmessage = () => {};
	global.postMessage = () => {postMessageCalled = true};

	require(WORKER_ALIAS);

	onmessage({data: {command: 'init', inputSampleRate: 44100, outputSampleRate: 44100, nChannels: 1}});
	onmessage({data: {command: 'feed', data: new Float32Array(1,2,3)}});

	expect(postMessageCalled).toBe(true);

	jest.resetModules(); // clean up or else it breaks on future tests
});

test('calling feed with message port sends data thru port', () => {
	let postMessageCalled = false;

	global.onmessage = () => {};

	require(WORKER_ALIAS);

	onmessage({data: {command: 'init', inputSampleRate: 44100, outputSampleRate: 44100, nChannels: 1}});
	onmessage({ports: [{postMessage: () => {postMessageCalled = true}}], data: {command: 'connect'}});
	
	onmessage({data: {command: 'feed', data: new Float32Array(1,2,3)}});

	expect(postMessageCalled).toBe(true);

	jest.resetModules(); // clean up or else it breaks on future tests
});

test('calling init doesnt throw (cant reach modified objects)', () => {
	let postMessageCalled = false;

	global.onmessage = () => {};

	require(WORKER_ALIAS);

	onmessage({data: {command: 'init', inputSampleRate: 69, outputSampleRate: 420, nChannels: 1337}});

	jest.resetModules(); // clean up or else it breaks on future tests
});

test('calling unknown command throws', () => {
	let postMessageCalled = false;

	global.onmessage = () => {};

	require(WORKER_ALIAS);

	expect(() => {
		onmessage({data: {command: 'nonexistent'}});
	}).toThrow('received unrecognized command');

	jest.resetModules(); // clean up or else it breaks on future tests
});