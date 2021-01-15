export const ConverterType = {
	SRC_SINC_BEST_QUALITY: 0,
	SRC_SINC_MEDIUM_QUALITY: 1,
	SRC_SINC_FASTEST: 2,
	SRC_ZERO_ORDER_HOLD: 3,
	SRC_LINEAR: 4
}

// method signature and type checking 
export function create(converterType, nChannels, inputSampleRate, outputSampleRate) {
	return new Promise((resolve, reject) => {
		// makes it easy to check throwing behavior. copied from original libsamplerate-js library
		if (converterType === undefined) {
			throw 'invalid converterType submitted';
		}

		// calling console.log tells the unit test that the module was "successfully created"
		console.log();

		resolve({
			simple: (array) => {
				return array;
			},
			full: (array) => {
				return array;
			},
			destroy: () => {
				console.log('destroy');
			}
		});
	});
}