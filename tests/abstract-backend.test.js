import { AbstractBackend } from '../src/abstract-backend';

test('calling feed fails', () => {
	let backend = new AbstractBackend();
	expect(() => {
		backend.feed(new Float32Array([1,2,3]));
	}).toThrow('feed() must be implemented');
});

test('calling connect fails', () => {
	let backend = new AbstractBackend();
	expect(() => {
		backend.connect();
	}).toThrow('connect() must be implemented');
});

test('calling disconnect fails', () => {
	let backend = new AbstractBackend();
	expect(() => {
		backend.disconnect();
	}).toThrow('disconnect() must be implemented');
});

test('setPort() doesnt do anything', () => {
	let backend = new AbstractBackend();
	backend.setPort();
});

test('onStateChange() doesnt do anything', () => {
	let backend = new AbstractBackend();
	backend.onStateChange();
});