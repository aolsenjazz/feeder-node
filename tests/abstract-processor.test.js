import AbstractProcessor from '../src/abstract-processor';

test('processBatch() throws', () => {
	let ap = new AbstractProcessor();

	expect(() => {
		ap.processBatch();
	}).toThrow('processBatch must be overridden!')
});

test('onProcessed() throws', () => {
	let ap = new AbstractProcessor();

	expect(() => {
		ap.onProcessed();
	}).toThrow('onProcessed must be overridden!')
});

test('setPort doesnt throw... or do anything', () => {
	let ap = new AbstractProcessor();

	ap.setPort();
});