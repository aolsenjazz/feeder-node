import MainThreadResampler from 'MAIN_THREAD_RESAMPLER';

test('mtr just returns data if inputSr === outputSr', (done) => {
	let correct = new Float32Array([1,2,3,4]);

	const cb = (data) => {
		expect(JSON.stringify(data)).toBe(JSON.stringify(correct));
		done();
	}

	let mtr = new MainThreadResampler(1, 44100, 44100);
	mtr.onProcessed = cb;

	mtr.processBatch(correct);
});

test('mtr resamples mono correctly', (done) => {
	let original = new Float32Array([1,4]);
	let correct = new Float32Array([1,1,2.5,4]);

	const cb = (data) => {
		expect(JSON.stringify(data)).toBe(JSON.stringify(correct));
		done();
	}

	let mtr = new MainThreadResampler(1, 44100, 88200);
	mtr.onProcessed = cb;

	mtr.processBatch(original);
});

test('mtr resamples stereo correctly', (done) => {
	let original = new Float32Array([1,1,4,4]);
	let correct = new Float32Array([1,1,1,1,2.5,2.5,4,4]);

	const cb = (data) => {
		expect(JSON.stringify(data)).toBe(JSON.stringify(correct));
		done();
	}

	let mtr = new MainThreadResampler(2, 44100, 88200);
	mtr.onProcessed = cb;

	mtr.processBatch(original);
});

test('mtr expands buffer to accomodate for large batch', () => {
	let bigInterleaved = new Float32Array(200000);

	const cb = (data) => {}

	let mtr = new MainThreadResampler(1, 44100, 88200);
	mtr.onProcessed = cb;

	mtr.processBatch(bigInterleaved);

	expect(mtr.inputChannelBuffers[0].length).toBe(200000);
});