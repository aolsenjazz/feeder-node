export const BackendState = {
	UNINITIALIZED: 1,
	READY: 2,
	PLAYING: 3,
	STARVED: 4,
};
Object.freeze(BackendState);

/** Abstract class representing an Audio Backend */
export class AbstractBackend {
	constructor() {

	}

	feed(float32Array) {
		throw 'feed() must be implemented';
	}

	connect(output) {
		throw 'connect() must be implemented';
	}

	disconnect() {
		throw 'disconnect() must be implemented';
	}

}