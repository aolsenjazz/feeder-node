import RingBuffer from '../src/ring-buffer.js';

test('readPos & writePos == 0; nReadableSamples == 0', () => {
	let rb = new RingBuffer(8192, 2);
	expect(rb.getNReadableSamples()).toBe(0);
});

test('write 128 * 10 samples, expect 1280 data available', () => {
	let rb = new RingBuffer(8192, 2);
	for (let i = 0; i < 10; i++) {
		let channels = Array.apply(null, Array(2)).map((x, i) => {return new Float32Array(128)});

		rb.write(channels);
	}

	expect(rb.getNReadableSamples()).toBe(1280);
});

test('resetReadPosition resets read position', () => {
	let rb = new RingBuffer(8192, 2);
	for (let i = 0; i < 10; i++) {
		let channels = Array.apply(null, Array(2)).map((x, i) => {return new Float32Array(128)});

		rb.write(channels);
	}

	rb.resetReadPosition();

	expect(rb.getNReadableSamples()).toBe(0);
});

test('buffer wraps around end and reports correct nSamplesAvailable', () => {
	let rb = new RingBuffer(100, 2);
	let channels = [new Float32Array(75), new Float32Array(75)];
	rb.write(channels);
	rb.write(channels);

	expect(rb.getNReadableSamples()).toBe(50);
});

test('write() throws if incorrect num channels given', () => {
	let rb = new RingBuffer(10, 2);
	let channels = [new Float32Array(10)];

	expect(() => {
		rb.write(channels);
	}).toThrow('readChannels.length must equal this._nChannels!');
});

test('write() throws if channel length isnt the same', () => {
	let rb = new RingBuffer(10, 2);
	let channels = [new Float32Array(10), new Float32Array(9)];

	expect(() => {
		rb.write(channels);
	}).toThrow('channel lengths differ in write()');
});

test('writing 0 samples does nothing', () => {
	let rb = new RingBuffer(10, 2);
	let channels = [new Float32Array(0), new Float32Array(0)];
	rb.write(channels);
	expect(rb.getNReadableSamples()).toBe(0);
});

test('creating rb with bufferLength 0 fails', () => {
	expect(() => {
		let rb = new RingBuffer(0, 2);
	}).toThrow('bufferLength must be >= 1');
});

test('creating rb with nChannels 0 fails', () => {
	expect(() => {
		let rb = new RingBuffer(10, 0);
	}).toThrow('nChannels must be 0 < nChannels <=2');
});

test('creating rb with nChannels 3 fails', () => {
	expect(() => {
		let rb = new RingBuffer(10, 3);
	}).toThrow('nChannels must be 0 < nChannels <=2');
});

test('reads correct amount of data', () => {
	let rb = new RingBuffer(8192, 2);

	let value = 0;
	for (let i = 0; i < 10; i++) {
		let channels = Array.apply(null, Array(2)).map((x, i) => {return new Float32Array(128)});

		for (let channelNum = 0; channelNum < channels.length; channelNum++) {
			for (let j = 0; j < channels[channelNum.length]; j++) {
				channels[channelNum][j] = value++;
			}
		}

		rb.write(channels);
	}

	rb.read(280);

	expect(rb.getNReadableSamples()).toBe(1000);
});

test('reads correct data', () => {
	let rb = new RingBuffer(8192, 2);

	let value = 0;
	for (let i = 0; i < 10; i++) {
		let channels = Array.apply(null, Array(2)).map((x, i) => {return new Float32Array(128)});

		for (let j = 0; j < channels[0].length; j++) {
			channels[0][j] = value;
			channels[1][j] = value;
			value++;
		}

		rb.write(channels);
	}

	let channels = rb.read(280);

	let correctAnswer = Array.apply(null, Array(2)).map((x, i) => {return new Float32Array(280)});
	for (let i = 0; i < 280; i++) {
		correctAnswer[0][i] = i;
		correctAnswer[1][i] = i;
	}

	expect(JSON.stringify(channels[0])).toBe(JSON.stringify(correctAnswer[0]));
	expect(JSON.stringify(channels[1])).toBe(JSON.stringify(correctAnswer[1]));
	
});

test('read includes wrap-around, reads correct data', () => {
	let rb = new RingBuffer(1000, 2);

	let value = 0;
	let channels = Array.apply(null, Array(2)).map((x, i) => {return new Float32Array(900)});

	for (let j = 0; j < channels[0].length; j++) {
		channels[0][j] = value;
		channels[1][j] = value;
		value++;
	}

	rb.write(channels);

	rb.read(900); // advance the readPos

	// advance write position and make it wrap
	channels = Array.apply(null, Array(2)).map((x, i) => {return new Float32Array(500)});

	for (let j = 0; j < channels[0].length; j++) {
		channels[0][j] = value;
		channels[1][j] = value;
		value++;
	}

	rb.write(channels);

	// read the wrapper data
	channels = rb.read(280);

	let correctAnswer = Array.apply(null, Array(2)).map((x, i) => {return new Float32Array(280)});
	for (let i = 0; i < 280; i++) {
		correctAnswer[0][i] = 900 + i;
		correctAnswer[1][i] = 900 + i;
	}

	expect(JSON.stringify(channels[0])).toBe(JSON.stringify(correctAnswer[0]));
	expect(JSON.stringify(channels[1])).toBe(JSON.stringify(correctAnswer[1]));
	
});

test('reading more data than available fills with zeroes once readable data exhausted', () => {
	let rb = new RingBuffer(8192, 2);

	let inputData = Array.apply(null, Array(2)).map((x, i) => {return new Float32Array(1280)});
	for (let i = 0; i < 1280; i++) {
		inputData[0][i] = i;
		inputData[1][i] = i;
	}
	rb.write(inputData);
	rb._writePos = 1000;

	let correctData = Array.apply(null, Array(2)).map((x, i) => {return new Float32Array(1280)});
	for (let i = 0; i < 1280; i++) {
		
		if (i >= 1000) {
			correctData[0][i] = 0;
			correctData[1][i] = 0;
		} else {
			correctData[0][i] = i;
			correctData[1][i] = i;
		}
		
	}

	expect(JSON.stringify(rb.read(1280))).toBe(JSON.stringify(correctData));
});

test('advanceReadPosition stop short because of _writePos', () => {
	let rb = new RingBuffer(100, 2);
	rb._writePos = 20;
	rb.advanceReadPosition(30);
	expect(rb._readPos).toBe(20);
});

test('advanceReadPosition advances correct # samples', () => {
	let rb = new RingBuffer(100, 2);
	rb._writePos = 50;
	rb.advanceReadPosition(30);
	expect(rb._readPos).toBe(30);
});

test('advanceReadPosition correctly wraps', () => {
	let rb = new RingBuffer(100, 2);
	rb._writePos = 20;
	rb._readPos = 90;
	rb.advanceReadPosition(20);
	expect(rb._readPos).toBe(10);
});

test('advanceReadPosition correctly wraps and stops at write pos', () => {
	let rb = new RingBuffer(100, 2);
	rb._writePos = 20;
	rb._readPos = 90;
	rb.advanceReadPosition(50);
	expect(rb._readPos).toBe(20);
});

test('write 128 * 10 * 2 INTERLEAVED samples, expect 1280 data available', () => {
	let rb = new RingBuffer(8192, 2);
	for (let i = 0; i < 10; i++) {
		let interleaved = new Float32Array(256);

		rb.write(interleaved, true);
	}

	expect(rb.getNReadableSamples()).toBe(1280);
});

test('write 128 * 10 * 2 INTERLEAVED w/wrap around, expect 280 readable', () => {
	let rb = new RingBuffer(1000, 2);
	for (let i = 0; i < 10; i++) {
		let interleaved = new Float32Array(256);

		rb.write(interleaved, true);
	}

	expect(rb.getNReadableSamples()).toBe(280);
});

test('buffer expands to write a large chunk of data', () => {
	let rb = new RingBuffer(100, 2);
	let largeChunk = [new Float32Array(1000), new Float32Array(1000)];
	rb.write(largeChunk);
	expect(rb.getNReadableSamples()).toBe(1000);
});

test('expanded buffer includes already-written samples', () => {
	let rb = new RingBuffer(100, 2);
	let prelimData = [new Float32Array([1,2,3]), new Float32Array([1,2,3])];
	rb.write(prelimData);
	let largeChunk = [new Float32Array(110), new Float32Array(110)];
	rb.write(largeChunk);
	expect(rb.getNReadableSamples()).toBe(113);
});

test('buffer expands, retains already-written data', () => {
	let rb = new RingBuffer(5, 2);
	let prelimData = [new Float32Array([0, 1, 2]), new Float32Array([0,1,2])];
	rb.write(prelimData);

	let largeChunk = [new Float32Array([3, 4, 5,6,7,8,9,10,11]), new Float32Array([3,4,5,6,7,8,9,10,11])];
	rb.write(largeChunk);
	let result = rb.read(6);
	let expected = [new Float32Array([0,1,2,3,4,5]), new Float32Array([0,1,2,3,4,5])];


	expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
});

test('hasDataAvailable return false', () => {
	let rb = new RingBuffer(4, 2);
	expect(rb.hasDataAvailable()).toBe(false);
});


