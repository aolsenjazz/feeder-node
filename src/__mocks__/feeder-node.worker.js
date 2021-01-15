export default class Worker {
	postMessage(e) {
		if (e.command === 'init') {
			this.onmessage({
				data: {
					command: 'postInit'
				}
			});
		} else if (e.command === 'feed') {
			this.data = e.data;

			this.onmessage({
				data: e.data
			});
		} else if (e.command === 'connect') {
			this.connected = true;
		}
	}

	// this will be overwridden
	onmessage(e) {}
}