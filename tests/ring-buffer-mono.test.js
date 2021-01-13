import RingBuffer from '../src/ring-buffer.js';

test('readPos & writePos == 0; nReadableSamples == 0', () => {
	let rb = new RingBuffer();
	expect(rb.getNReadableSamples()).toBe(0);
});

test('write 128 * 10 samples, expect 1280 data available', () => {
	let rb = new RingBuffer(8192, 1);

	for (let i = 0; i < 10; i++) {
		let channel = new Float32Array(128);
		rb.write(channel);
	}

	expect(rb.getNReadableSamples()).toBe(1280);
});

test('resetReadPosition resets read position', () => {
	let rb = new RingBuffer(8192, 1);
	let channel = new Float32Array(1280);

	rb.resetReadPosition(1280);

	expect(rb.getNReadableSamples()).toBe(0);
});

test('buffer wraps around end and reports correct nSamplesAvailable', () => {
	let rb = new RingBuffer(100, 1);
	let channel = new Float32Array(75);
	rb.write(channel);
	rb.write(channel);

	expect(rb.getNReadableSamples()).toBe(50);
});

test('write() throws if incorrect num channels given', () => {
	let rb = new RingBuffer(10, 1);
	let channels = [new Float32Array(10), new Float32Array(10)];

	expect(() => {
		rb.write(channels);
	}).toThrow('readChannels.length must equal this._nChannels!');
});

test('writing 0 samples does nothing', () => {
	let rb = new RingBuffer(10, 1);
	let channel = new Float32Array(0);
	rb.write(channel);
	expect(rb.getNReadableSamples()).toBe(0);
});

test('creating rb with bufferLength 0 fails', () => {
	expect(() => {
		let rb = new RingBuffer(0, 1);
	}).toThrow('bufferLength must be >= 1');
});

test('reads correct amount of data', () => {
	let rb = new RingBuffer(8192, 1);

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

test('reads correct data', () => {
	let rb = new RingBuffer(8192, 1);

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

test('read includes wrap-around, reads correct data', () => {
	let rb = new RingBuffer(1000, 1);

	let channel = new Float32Array(900);

	let value = 0;
	for (let j = 0; j < channel.length; j++) {
		channel[j] = value++;
	}

	rb.write(channel);

	rb.read(900); // advance the readPos

	// advance write position and make it wrap
	channel = new Float32Array(500);

	for (let j = 0; j < channel.length; j++) {
		channel[j] = value++;
	}

	rb.write(channel);

	// read the wrapper data
	channel = rb.read(280);

	let correctAnswer = new Float32Array(280);
	for (let i = 0; i < 280; i++) {
		correctAnswer[i] = 900 + i;
	}

	expect(JSON.stringify(channel)).toBe(JSON.stringify([correctAnswer]));
});

test('reading more data than available fills with zeroes once readable data exhausted', () => {
	let rb = new RingBuffer(8192, 1);

	let inputData = new Float32Array(1280);
	for (let i = 0; i < 1280; i++) {
		inputData[i] = i;
	}
	rb.write(inputData);
	rb._writePos = 1000;

	let correctData = new Float32Array(1280);
	for (let i = 0; i < 1280; i++) {
		if (i >= 1000) correctData[i] = 0;
		else correctData[i] = i;
	}

	expect(JSON.stringify(rb.read(1280))).toBe(JSON.stringify([correctData]));
});

test('advanceReadPosition stop short because of _writePos', () => {
	let rb = new RingBuffer(100, 1);
	rb._writePos = 20;
	rb.advanceReadPosition(30);
	expect(rb._readPos).toBe(20);
});

test('advanceReadPosition advances correct # samples', () => {
	let rb = new RingBuffer(100, 1);
	rb._writePos = 50;
	rb.advanceReadPosition(30);
	expect(rb._readPos).toBe(30);
});

test('advanceReadPosition correctly wraps', () => {
	let rb = new RingBuffer(100, 1);
	rb._writePos = 20;
	rb._readPos = 90;
	rb.advanceReadPosition(20);
	expect(rb._readPos).toBe(10);
});

test('advanceReadPosition correctly wraps and stops at write pos', () => {
	let rb = new RingBuffer(100, 1);
	rb._writePos = 20;
	rb._readPos = 90;
	rb.advanceReadPosition(50);
	expect(rb._readPos).toBe(20);
});

test('buffer expands to write a large chunk of data', () => {
	let rb = new RingBuffer(100, 1);
	let largeChunk = new Float32Array(1000);
	rb.write(largeChunk);
	expect(rb.getNReadableSamples()).toBe(1000);
});

test('expanded buffer includes already-written samples', () => {
	let rb = new RingBuffer(100, 1);
	let prelimData = new Float32Array([1,2,3]);
	rb.write(prelimData);
	let largeChunk = new Float32Array(110);
	rb.write(largeChunk);
	expect(rb.getNReadableSamples()).toBe(113);
});

test('buffer expands, retains already-written data', () => {
	let rb = new RingBuffer(5, 1);
	let prelimData = new Float32Array([0, 1, 2]);
	rb.write(prelimData);
	
	let largeChunk = new Float32Array([3, 4, 5,6,7,8,9,10,11]);
	rb.write(largeChunk);

	let result = rb.read(6);
	let expected = new Float32Array([0,1,2,3,4,5]);

	expect(JSON.stringify(result)).toBe(JSON.stringify([expected]));
});

test('readInto correctly wraps and reads', () => {
	let rb = new RingBuffer(10, 1);
	rb.write(new Float32Array([0,1,2,3,4]));
	rb.read(5);

	let correct = new Float32Array([0,1,2,3,4,5,6,7,8]);

	rb.write(correct);
	
	let result = new Float32Array(9);
	rb.readInto([result], 9);

	expect(JSON.stringify(result)).toBe(JSON.stringify(correct));
});
