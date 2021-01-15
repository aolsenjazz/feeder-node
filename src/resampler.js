/**
 * Performs upsampling via linear interpolation, and downsampling by simply remove extra
 * samples. In most cases, this class should never be used because uses is a fairly naive
 * resampling algorithm. Prefer @alexanderolsen/libresample-js
 *
 * This class is included because it is fast enough to be used on the main thread. 
 */
export default class LinearResampler {
	constructor(inputSampleRate, outputSampleRate, nChannels) {
		this.inputSampleRate = inputSampleRate;
		this.outputSampleRate = outputSampleRate;
		this.nChannels = nChannels;

		this._resampleFractional = 0;
		this._resampleLastSampleData = undefined;
	}

	/**
	@param {SampleBuffer} a list of Float32Arrays, one array per channel
	Taken from https://github.com/brion/audio-feeder/blob/master/src/index.js
	*/
	resample(sampleData) {
		var rate = this.inputSampleRate,
			channels = this.nChannels,
			targetRate = this.outputSampleRate;

		if (rate == targetRate) return sampleData;

		var inputLen = sampleData[0].length,
			previousFractional = this._resampleFractional,
			outputLen = inputLen * targetRate / rate + previousFractional,
			outputSamples = Math.floor(outputLen),
			remainingFractional = (outputLen - outputSamples);

		let newSamples = doInterpolate(rate, targetRate, channels, sampleData, 
			outputSamples, this._resampleLastSampleData, previousFractional);
		
		this._resampleFractional = remainingFractional;
		this._resampleLastSampleData = sampleData;

		return newSamples;
	}
}

function doInterpolate(rate, targetRate, channels, sampleData, outputSamples, resampleLastSampleData, previousFractional) {
	var interpolate;
	var newSamples = [];
	if (rate < targetRate) interpolate = upsample;
	else  interpolate = downsample;

	for (var channel = 0; channel < channels; channel++) {
		var inputChannel = channel;
		var input = sampleData[inputChannel],
			output = new Float32Array(outputSamples),
			previous = resampleLastSampleData ? resampleLastSampleData[inputChannel] : undefined;

		interpolate(input, output, previous, previousFractional, rate, targetRate);

		newSamples.push(output);
	}
	return newSamples;
}

function upsample(input, output, previous, previousFractional, rate, targetRate) {
	var inputSample = function(i) {
		if (i < 0) {
			if (previous && previous.length + i > 0) return previous[previous.length + i];
			else return input[0];
		} else {
			return input[i];
		}
	};

	for (var i = 0; i < output.length; i++) {
		var j = ((i + 1 - previousFractional) * rate / targetRate) - 1;
		var a = Math.floor(j);
		var b = Math.ceil(j);

		var out;
		if (a == b) {
			out = inputSample(a);
		} else {
			out = inputSample(a) * (b - j) +
			      inputSample(b) * (j - a);
		}

		output[i] = out;
	}
};

function downsample(input, output, previous) {
	for (var i = 0; i < output.length; i++) {
		output[i] = input[(i * input.length / output.length) | 0];
	}
}