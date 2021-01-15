import RingBuffer from '../src/ring-buffer.js';
import { writeInterleavedToChannels } from '../src/util';

/**
 * Helper function to write multi-channel data to the buffer and compare
 * it against ground truth
 */
function writeToBuffer(ringBuffer, nChannels, samplesPerChannel) {
	let interleavedData = new Float32Array(samplesPerChannel * nChannels);
	for (let i = 0; i < interleavedData.length; i++) {
		interleavedData[i] = i;
	}
	let channelData = writeInterleavedToChannels(interleavedData, nChannels);

	ringBuffer.write(interleavedData);
	return channelData;
}

test('readPos & writePos == 0; nReadableSamples == 0', () => {
	let rb = new RingBuffer();
	expect(rb.getNReadableSamples()).toBe(0);
});

test('creating ringBuffer with channels < 1 fails', () => {
	expect(() => {
		let rb = new RingBuffer(100, 0);
	}).toThrow();
});

test('write 128 * 10 samples in mono, expect 1280 data available', () => {
	let nChannels = 1;
	let bufferLength = 8192;
	let samplesPerChannel = 1280;

	let rb = new RingBuffer(bufferLength, nChannels);

	writeToBuffer(rb, nChannels, samplesPerChannel);

	expect(rb.getNReadableSamples()).toBe(samplesPerChannel);
});

test('write 128 * 10 samples in stereo, expect 640 data available', () => {
	let nChannels = 2;
	let bufferLength = 8192;

	let rb = new RingBuffer(bufferLength, nChannels);

	for (let i = 0; i < 10; i++) {
		let interleaved = new Float32Array(128);
		rb.write(interleaved);
	}

	expect(rb.getNReadableSamples()).toBe(640);
});

test('write 128 * 10 samples with 8 channels, expect 160 data available', () => {
	let nChannels = 8;
	let bufferLength = 8192;

	let rb = new RingBuffer(bufferLength, nChannels);

	for (let i = 0; i < 10; i++) {
		let interleaved = new Float32Array(128);
		rb.write(interleaved);
	}

	expect(rb.getNReadableSamples()).toBe(160);
});

test('buffer wraps around end and reports correct nSamplesAvailable in mono', () => {
	let nChannels = 1;
	let bufferLength = 100;

	let rb = new RingBuffer(bufferLength, nChannels);
	let channel = new Float32Array(75);
	rb.write(channel);
	rb.write(channel);

	expect(rb.getNReadableSamples()).toBe(50);
});

test('buffer wraps around end and reports correct nSamplesAvailable in stereo', () => {
	let nChannels = 2;
	let bufferLength = 100;

	let rb = new RingBuffer(bufferLength, nChannels);
	let channel = new Float32Array(75 * nChannels);
	rb.write(channel);
	rb.write(channel);

	expect(rb.getNReadableSamples()).toBe(50);
});

test('buffer wraps around end and reports correct nSamplesAvailable with 8 channels', () => {
	let nChannels = 8;
	let bufferLength = 100;

	let rb = new RingBuffer(bufferLength, nChannels);
	let channel = new Float32Array(75 * nChannels);
	rb.write(channel);
	rb.write(channel);

	expect(rb.getNReadableSamples()).toBe(50);
});

test('write() throws non-TypedArray is submitted', () => {
	let nChannels = 2;
	let bufferLength = 100;

	let rb = new RingBuffer(bufferLength, nChannels);
	
	expect(() => {
		rb.write([]);
	}).toThrow('Must submit a TypedArray. Received Array');
});

test('writing 0 samples does nothing', () => {
	let nChannels = 2;
	let bufferLength = 100;

	let rb = new RingBuffer(bufferLength, nChannels);

	let data = new Float32Array(0);
	rb.write(data);
	expect(rb.getNReadableSamples()).toBe(0);
});

test('creating RingBuffer with bufferLength 0 fails', () => {
	let nChannels = 2;
	let bufferLength = 0;

	expect(() => {
		let rb = new RingBuffer(bufferLength, nChannels);
	}).toThrow('bufferLength must be >= 1');
});

test('reads correct amount of data in mono', () => {
	let nChannels = 1;
	let bufferLength = 8192;

	let rb = new RingBuffer(bufferLength, nChannels);

	let value = 0;
	for (let i = 0; i < 10; i++) {
		let channel = new Float32Array(128);

		for (let j = 0; j < channel.length; j++) {
			channel[j] = value++;
		}

		rb.write(channel);
	}

	rb.read(280);

	expect(rb.getNReadableSamples()).toBe(1000);
});

test('reads correct amount of data in stereo', () => {
	let nChannels = 2;
	let bufferLength = 8192;

	let rb = new RingBuffer(bufferLength, nChannels);

	let value = 0;
	for (let i = 0; i < 10; i++) {
		let channel = new Float32Array(128 * nChannels);

		for (let j = 0; j < channel.length; j++) {
			channel[j] = value++;
		}

		rb.write(channel);
	}

	rb.read(280);

	expect(rb.getNReadableSamples()).toBe(1000);
});

test('reads correct amount of data with 8 channels', () => {
	let nChannels = 8;
	let bufferLength = 8192;

	let rb = new RingBuffer(bufferLength, nChannels);

	let value = 0;
	for (let i = 0; i < 10; i++) {
		let channel = new Float32Array(128 * nChannels);

		for (let j = 0; j < channel.length; j++) {
			channel[j] = value++;
		}

		rb.write(channel);
	}

	rb.read(280);

	expect(rb.getNReadableSamples()).toBe(1000);
});

test('reads correct data in mono', () => {
	let nChannels = 1;
	let bufferLength = 8192;

	let rb = new RingBuffer(bufferLength, nChannels);

	let value = 0;
	for (let i = 0; i < 10; i++) {
		let channel = new Float32Array(128);

		for (let j = 0; j < channel.length; j++) {
			channel[j] = value++;
		}

		rb.write(channel);
	}

	let readChannel = rb.read(280);

	let correctAnswer = new Float32Array(280);
	for (let i = 0; i < 280; i++) {
		correctAnswer[i] = i;
	}

	expect(JSON.stringify(readChannel)).toBe(JSON.stringify([correctAnswer]));
});

test('reads correct data in stereo', () => {
	let nChannels = 2;
	let bufferLength = 8192;
	let samplesPerChannel = 8;

	let rb = new RingBuffer(bufferLength, nChannels);

	let correct = writeToBuffer(rb, nChannels, samplesPerChannel);

	expect(JSON.stringify(rb.read(samplesPerChannel))).toBe(JSON.stringify(correct));
});

test('reads correct data with 8 channels', () => {
	let nChannels = 8;
	let bufferLength = 8192;
	let samplesPerChannel = 128;

	let rb = new RingBuffer(bufferLength, nChannels);

	let correct = writeToBuffer(rb, nChannels, samplesPerChannel);

	expect(JSON.stringify(rb.read(samplesPerChannel))).toBe(JSON.stringify(correct));
});

test('read includes wrap-around, reads correct data in mono', () => {
	let nChannels = 1;
	let bufferLength = 100;
	let samplesPerChannel = 75;

	let rb = new RingBuffer(bufferLength, nChannels);

	writeToBuffer(rb, nChannels, bufferLength);
	let correct = writeToBuffer(rb, nChannels, samplesPerChannel);

	expect(JSON.stringify(rb.read(samplesPerChannel))).toBe(JSON.stringify(correct));
});

test('read includes wrap-around, reads correct data in stereo', () => {
	let nChannels = 2;
	let bufferLength = 100;
	let samplesPerChannel = 75;

	let rb = new RingBuffer(bufferLength, nChannels);

	writeToBuffer(rb, nChannels, bufferLength);
	let correct = writeToBuffer(rb, nChannels, samplesPerChannel);

	expect(JSON.stringify(rb.read(samplesPerChannel))).toBe(JSON.stringify(correct));
});

test('read includes wrap-around, reads correct data with 8 channels', () => {
	let nChannels = 8;
	let bufferLength = 100;
	let samplesPerChannel = 75;

	let rb = new RingBuffer(bufferLength, nChannels);

	writeToBuffer(rb, nChannels, bufferLength);
	let correct = writeToBuffer(rb, nChannels, samplesPerChannel);

	expect(JSON.stringify(rb.read(samplesPerChannel))).toBe(JSON.stringify(correct));
});

test('trying to read more data than available only fills readable amount', () => {
	let nChannels = 8;
	let bufferLength = 100;
	let samplesPerChannel = 75;

	let rb = new RingBuffer(bufferLength, nChannels);

	writeToBuffer(rb, nChannels, samplesPerChannel);

	let result = rb.read(bufferLength);
	expect(result[0][samplesPerChannel + 1]).toBe(0);
});

test('writing a chunk longer than bufferLength expands buffer in mono', () => {
	let nChannels = 1;
	let bufferLength = 100;
	let samplesPerChannel = 75;

	let rb = new RingBuffer(bufferLength, nChannels);
	let spy = jest.spyOn(rb, '_resize');

	rb.write(new Float32Array(bufferLength * nChannels + 1));

	expect(spy).toHaveBeenCalledTimes(1);
});

test('writing a chunk longer than bufferLength expands buffer 8 channel', () => {
	let nChannels = 8;
	let bufferLength = 100;
	let samplesPerChannel = 75;

	let rb = new RingBuffer(bufferLength, nChannels);
	let spy = jest.spyOn(rb, '_resize');

	rb.write(new Float32Array(bufferLength * nChannels + 1));

	expect(spy).toHaveBeenCalledTimes(1);
});

test('expanded buffer includes already-written samples in mono', () => {
	let nChannels = 1;
	let bufferLength = 100;
	let dataToWrite = 110;

	let rb = new RingBuffer(bufferLength, nChannels);

	let prelimData = new Float32Array([1,2,3]);
	rb.write(prelimData);


	let largeChunk = new Float32Array(dataToWrite * nChannels);
	rb.write(largeChunk);
	expect(rb.getNReadableSamples()).toBe(dataToWrite + prelimData.length / nChannels);
});

test('expanded buffer includes already-written samples in stereo', () => {
	let nChannels = 2;
	let bufferLength = 100;
	let dataToWrite = 110;

	let rb = new RingBuffer(bufferLength, nChannels);

	let prelimData = new Float32Array([1,2,3,4]);
	rb.write(prelimData);


	let largeChunk = new Float32Array(dataToWrite * nChannels);
	rb.write(largeChunk);
	expect(rb.getNReadableSamples()).toBe(dataToWrite + prelimData.length / nChannels);
});

test('expanded buffer includes already-written samples 8 channel', () => {
	let nChannels = 8;
	let bufferLength = 100;
	let dataToWrite = 110;

	let rb = new RingBuffer(bufferLength, nChannels);

	let prelimData = new Float32Array([1,2,3,4,5,6,7,8]);
	rb.write(prelimData);


	let largeChunk = new Float32Array(dataToWrite * nChannels);
	rb.write(largeChunk);
	expect(rb.getNReadableSamples()).toBe(dataToWrite + prelimData.length / nChannels);
});

test('buffer expands, retains already-written data in mono', () => {
	let nChannels = 1;
	let bufferLength = 10;

	let rb = new RingBuffer(bufferLength, nChannels);
	let firstWritten = writeToBuffer(rb, nChannels, 5);
	
	let largeChunk = new Float32Array([1,2,3,4,5,6,7,8,9,10,11]);
	rb.write(largeChunk);

	let result = rb.read(5);

	expect(JSON.stringify(result)).toBe(JSON.stringify(firstWritten));
});

test('buffer expands, retains already-written data in stereo', () => {
	let nChannels = 2;
	let bufferLength = 10;

	let rb = new RingBuffer(bufferLength, nChannels);
	let firstWritten = writeToBuffer(rb, nChannels, 5);
	
	let largeChunk = new Float32Array([1,2,3,4,5,6,7,8,9,10,11, 1,2,3,4,5,6,7,8,9,10,11]);
	rb.write(largeChunk);

	let result = rb.read(5);

	expect(JSON.stringify(result)).toBe(JSON.stringify(firstWritten));
});

test('buffer expands, retains already-written data in stereo', () => {
	let nChannels = 8;
	let bufferLength = 10;

	let rb = new RingBuffer(bufferLength, nChannels);
	let firstWritten = writeToBuffer(rb, nChannels, 5);
	
	// god is this lazy
	let largeChunk = new Float32Array([1,2,3,4,5,6,7,8,9,10,11, 1,2,3,4,5,6,7,8,9,10,11,
		                               1,2,3,4,5,6,7,8,9,10,11, 1,2,3,4,5,6,7,8,9,10,11,
		                               1,2,3,4,5,6,7,8,9,10,11, 1,2,3,4,5,6,7,8,9,10,11,
		                               1,2,3,4,5,6,7,8,9,10,11, 1,2,3,4,5,6,7,8,9,10,11]);
	rb.write(largeChunk);

	let result = rb.read(5);

	expect(JSON.stringify(result)).toBe(JSON.stringify(firstWritten));
});

test('read correctly wraps and reads in mono', () => {
	let nChannels = 1;
	let bufferLength = 10;

	let rb = new RingBuffer(bufferLength, nChannels);

	let firstBatchLen = 5;
	let first = writeToBuffer(rb, nChannels, firstBatchLen);
	rb.read(firstBatchLen);

	let secondBatchLen = 9;
	let second = writeToBuffer(rb, nChannels, secondBatchLen);
	
	let result = rb.read(9);

	expect(JSON.stringify(result)).toBe(JSON.stringify(second));
});

test('read correctly wraps and reads in stereo', () => {
	let nChannels = 2;
	let bufferLength = 10;

	let rb = new RingBuffer(bufferLength, nChannels);

	let firstBatchLen = 5;
	let first = writeToBuffer(rb, nChannels, firstBatchLen);
	rb.read(firstBatchLen);

	let secondBatchLen = 9;
	let second = writeToBuffer(rb, nChannels, secondBatchLen);
	
	let result = rb.read(9);

	expect(JSON.stringify(result)).toBe(JSON.stringify(second));
});

test('read correctly wraps and reads 8 channel', () => {
	let nChannels = 8;
	let bufferLength = 10;

	let rb = new RingBuffer(bufferLength, nChannels);

	let firstBatchLen = 5;
	let first = writeToBuffer(rb, nChannels, firstBatchLen);
	rb.read(firstBatchLen);

	let secondBatchLen = 9;
	let second = writeToBuffer(rb, nChannels, secondBatchLen);
	
	let result = rb.read(9);

	expect(JSON.stringify(result)).toBe(JSON.stringify(second));
});