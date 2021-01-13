export default class Worker {
	postMessage() {
		// call console.log so we can spy on the global console object to receive postMessage() calls
		console.log();
	}
}