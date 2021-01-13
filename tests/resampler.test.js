import Resampler from '../src/resampler';

test('resample() with inputSr == outputSr just returns data', () => {
	let resampler = new Resampler(44100, 44100, 1);
	let correct = new Float32Array([1,2,3,4]);

	let result = resampler.resample(correct);

	expect(JSON.stringify(result)).toBe(JSON.stringify(correct));
});

test('resample() upsamples correctly', () => {
	let resampler = new Resampler(44100, 88200, 1);
	let data = new Float32Array([1,2,3,4]);

	let result = resampler.resample([data]);

	let correct = [new Float32Array([1,1,1.5,2,2.5,3,3.5,4])]

	expect(JSON.stringify(result)).toBe(JSON.stringify(correct));
});

test('resample() downsamples correctly', () => {
	let resampler = new Resampler(88200, 44100, 1);
	let data = new Float32Array([1,1,4,4]);

	let result = resampler.resample([data]);

	let correct = [new Float32Array([1,4])]

	expect(JSON.stringify(result)).toBe(JSON.stringify(correct));
});

test('resample() interpolates sequential messages', () => {
	let resampler = new Resampler(44100, 48000, 1);
	let data = new Float32Array([1,1,4,4]);

	resampler.resample([data]);
	let result = resampler.resample([data]);
	let correct = new Float32Array([2.21875, 1, 2.293750047683716, 4]);

	expect(JSON.stringify(result)).toBe(JSON.stringify([correct]));
});