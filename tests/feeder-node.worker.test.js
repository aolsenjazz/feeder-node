/**
 * @jest-environment jsdom
 */

// feeder-node.worker.js is currently mocked, so load the actual file using this alias
const WORKER_ALIAS = 'FEEDER_NODE_WORKER';

test('calling feed without message port send data back to main thread', (done) => {
	let postMessageCalled = false;

	global.onmessage = () => {};
	global.postMessage = () => {postMessageCalled = true};

	require(WORKER_ALIAS);

	global.onmessage({data: {command: 'init', inputSampleRate: 44100, outputSampleRate: 44100, nChannels: 1, converterType: 0}});

	setTimeout(() => {
		onmessage({data: {command: 'feed', data: new Float32Array(1,2,3)}});
		expect(postMessageCalled).toBe(true);
		jest.resetModules(); // clean up or else it breaks on future tests
		done();
	}, 100);

});

test('calling feed with message port sends data thru port', (done) => {
	let postMessageCalled = false;

	global.onmessage = () => {};

	require(WORKER_ALIAS);

	onmessage({data: {command: 'init', inputSampleRate: 44100, outputSampleRate: 44100, nChannels: 1, converterType: 0}});

	setTimeout(() => {
		onmessage({ports: [{postMessage: () => {postMessageCalled = true}}], data: {command: 'connect'}});
	
		onmessage({data: {command: 'feed', data: new Float32Array(1,2,3)}});

		expect(postMessageCalled).toBe(true);

		jest.resetModules(); // clean up or else it breaks on future tests
		done();
	}, 100);
});

test('calling init resolves successfully', (done) => {
	global.onmessage = () => {};

	require(WORKER_ALIAS);

	const consoleLog = global.console.log;
	global.console.log = jest.fn();
	const spy = jest.spyOn(global.console, 'log');
 
	onmessage({data: {command: 'init', inputSampleRate: 69, outputSampleRate: 420, nChannels: 1337, converterType:0}});

	setTimeout(() => {

		expect(spy).toHaveBeenCalledTimes(1);
		global.console.log = consoleLog; // reset console
		jest.resetModules(); // clean up or else it breaks on future tests
		done();
	}, 100);
});

test('calling unknown command throws', (done) => {
	global.onmessage = () => {};

	require(WORKER_ALIAS);

	onmessage({data: {command: 'nonexistent'}})
		.then(() => {

		})
		.catch((err) => {
			expect(err).toBe('received unrecognized command')
			done();
		});

	jest.resetModules(); // clean up or else it breaks on future tests
});