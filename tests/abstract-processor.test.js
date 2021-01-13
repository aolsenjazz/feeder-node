import AbstractProcessor from '../src/abstract-processor';

test('processBatch() throws', () => {
	let ap = new AbstractProcessor();

	expect(() => {
		ap.processBatch();
	}).toThrow('processBatch must be overridden!')
});