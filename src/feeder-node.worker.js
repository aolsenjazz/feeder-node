import Resampler from './resampler';
import { writeChannelsToInterleaved, writeInterleavedToChannels } from './util';

/** Port send data directly to audio thread */
let backendPort = undefined;
let resampler, nChannels;

onmessage = function(e) {
	if (e.data.command == 'feed') {
		// resample the given data and either return it or pass to Audio thread via backendPort
		let interleaved = new Float32Array(e.data.data);
		let channels = writeInterleavedToChannels(interleaved, nChannels);
		let resampled = resampler.resample(channels);
		let reInterleaved = writeChannelsToInterleaved(resampled);

		if (backendPort == undefined) {
			postMessage(reInterleaved, [reInterleaved.buffer]);
		} else {
			backendPort.postMessage({command: 'feed', data: reInterleaved}, [reInterleaved.buffer]);
		}
	} else if (e.data.command === 'connect') {
		// if using AudioWorklet as well, send data directly from this thread to Audio thread
		backendPort = e.ports[0];
	} else if (e.data.command === 'init') {
		// this should be called immediately after loading this Worker
		nChannels = e.data.nChannels;
		resampler = new Resampler(e.data.inputSampleRate, e.data.outputSampleRate, nChannels);
	} else {
		throw 'received unrecognized command';
	}
}