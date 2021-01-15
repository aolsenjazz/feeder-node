import {
	toFloat32, 
	writeSilence, 
	copyChannelsToInterleaved, 
	copyInterleavedToChannels,
	writeChannelsToInterleaved,
	writeInterleavedToChannels,
	checkFileExists,
} from '../src/util';

import 'web-audio-test-api';
import 'babel-polyfill';

test('toFloat32 float32', () => {
	let float32 = new Float32Array([1,2,3]);
	let result = toFloat32(float32);
	expect(JSON.stringify(result)).toBe(JSON.stringify(float32));
});

test('toFloat32 int8', () => {
	let int8 = new Int8Array([-127, 0, 127]);
	let correct = new Float32Array([-1, 0, 1]);
	let result = toFloat32(int8);
	expect(JSON.stringify(result)).toBe(JSON.stringify(correct));
});

test('toFloat32 int16', () => {
	let int16 = new Int16Array([-32767, 0, 32767]);
	let correct = new Float32Array([-1, 0, 1]);
	let result = toFloat32(int16);
	expect(JSON.stringify(result)).toBe(JSON.stringify(correct));
});

test('toFloat32 int32', () => {
	let int32 = new Int32Array([-2147483647, 0, 2147483647]);
	let correct = new Float32Array([-1, 0, 1]);
	let result = toFloat32(int32);
	expect(JSON.stringify(result)).toBe(JSON.stringify(correct));
});

test('toFloat32 Uint8', () => {
	let int8 = new Uint8Array([0, 127, 127 * 2]);
	let correct = new Float32Array([-1, 0, 1]);
	let result = toFloat32(int8);
	expect(JSON.stringify(result)).toBe(JSON.stringify(correct));
});

test('toFloat32 Uint16', () => {
	let int16 = new Uint16Array([0, 32767, 32767 * 2]);
	let correct = new Float32Array([-1, 0, 1]);
	let result = toFloat32(int16);
	expect(JSON.stringify(result)).toBe(JSON.stringify(correct));
});

test('toFloat32 Uint32', () => {
	let int32 = new Uint32Array([0, 2147483647, 2147483647 * 2]);
	let correct = new Float32Array([-1, 0, 1]);
	let result = toFloat32(int32);
	expect(JSON.stringify(result)).toBe(JSON.stringify(correct));
});

test('toFloat32 Array throws', () => {
	expect(() => {
		toFloat32([1,2,3]);
	}).toThrow('Unsupport data type function Array() { [native code] }');
})

test('writeSilence writes correct mono data', () => {
	let mono = new Float32Array(128);
	for (let i = 0; i < mono.length; i++) {
		mono[i] = i;
	}

	let correct = new Float32Array(128);
	writeSilence([mono], true)
	expect(JSON.stringify(mono)).toBe(JSON.stringify(correct));
});

test('writeSilence writes correct data to stereo channels', () => {
	let stereo = [new Float32Array(128), new Float32Array(128)];
	for (let i = 0; i < stereo[0].length; i++) {
		stereo[0][i] = i;
		stereo[1][i] = i;
	}

	let correct = JSON.stringify([new Float32Array(128), new Float32Array(128)]);
	writeSilence(stereo)
	expect(JSON.stringify(stereo)).toBe(correct);
});

test('copyInterleavedToChannels copies data correct', () => {
	let interleaved = new Float32Array(256);
	let stereo = [new Float32Array(128), new Float32Array(128)];
	let correct = [new Float32Array(128), new Float32Array(128)];

	let interleavedVal = 0;
	for (let i = 0; i < interleaved.length; i++) {
		if (i!= 0 && i % 2 == 0) interleavedVal++;
		interleaved[i] = interleavedVal;
		
	}

	for (let i = 0; i < correct[0].length; i++) {
		correct[0][i] = i;
		correct[1][i] = i;
	}

	copyInterleavedToChannels(interleaved, stereo)
	expect(JSON.stringify(stereo)).toBe(JSON.stringify(correct));
});

test('copyInterleavedToChannels fails if channel lengths are bad', () => {
	let interleaved = new Float32Array(260);
	let stereo = [new Float32Array(128), new Float32Array(128)];

	expect(() => {
		copyInterleavedToChannels(interleaved, stereo);
	}).toThrow('incorrect channel lengths');
});

test('copyChannelsToInterleaved copies data correct', () => {
	let interleaved = new Float32Array(256);
	let stereo = [new Float32Array(128), new Float32Array(128)];
	let correct = new Float32Array(256);

	let correctVal = 0;
	for (let i = 0; i < interleaved.length; i++) {
		if (i != 0 && i % 2 == 0) correctVal++;
		correct[i] = correctVal;
	}

	for (let i = 0; i < stereo[0].length; i++) {
		stereo[0][i] = i;
		stereo[1][i] = i;
	}

	copyChannelsToInterleaved(stereo, interleaved)
	expect(JSON.stringify(interleaved)).toBe(JSON.stringify(correct));
});

test('copyChannelsToInterleaved fails if interleaved arraay is smaller than stereo length', () => {
	let interleaved = new Float32Array(255);
	let stereo = [new Float32Array(128), new Float32Array(128)];


	expect(() => {
		copyChannelsToInterleaved(stereo, interleaved);
	}).toThrow('incorrect channel lengths');
});

test('writeChannelsToInterleaved does whats expected', () => {
	let correct = new Float32Array([1,2,3,4]);
	let channels = [new Float32Array([1,3]), new Float32Array([2,4])];

	expect(JSON.stringify(writeChannelsToInterleaved(channels))).toBe(JSON.stringify(correct));
});

test('writeInterleavedToChannels does whats expected', () => {
	let correct = [new Float32Array([1,3]), new Float32Array([2,4])];
	let interleaved = new Float32Array([1,2,3,4]);

	expect(JSON.stringify(writeInterleavedToChannels(interleaved, 2))).toBe(JSON.stringify(correct));
});

test('writeInterleavedToChannels fails if nChannels isnt a number', () => {
	let interleaved = new Float32Array([1,2,3,4]);

	expect(() => {
		writeInterleavedToChannels(interleaved);
	}).toThrow('nChannels must be an integer');
});