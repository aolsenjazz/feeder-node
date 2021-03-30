import { create } from "@alexanderolsen/libsamplerate-js";

/** Port send data directly to audio thread */
let backendPort = undefined;
let resampler;

self.onmessage = async function (e) {
	if (e.data.command == "feed") {
		feed(e.data.data);
	} else if (e.data.command === "connect") {
		// if using AudioWorklet as well, send data directly from this thread to Audio thread
		backendPort = e.ports[0];
	} else if (e.data.command === "init") {
		// this should be called immediately after loading this Worker
		let converterType = e.data.converterType;
		let nChannels = e.data.nChannels;
		let inputSampleRate = e.data.inputSampleRate;
		let outputSampleRate = e.data.outputSampleRate;
		let pathToWasm = e.data.pathToWasm;

		await init(
			converterType,
			nChannels,
			inputSampleRate,
			outputSampleRate,
			pathToWasm
		);
		postMessage({ command: "postInit" });
	} else {
		throw "received unrecognized command";
	}
};

/**
 * Resamples data and sends it to the backend for propagation
 *
 * @param { Float32Array } data Mono or interleaved audio data
 */
function feed(data) {
	let interleaved = new Float32Array(data);
	let resampled = resampler.full(interleaved);

	if (backendPort == undefined) {
		postMessage(resampled, [resampled.buffer]);
	} else {
		backendPort.postMessage({ command: "feed", data: resampled }, [
			resampled.buffer,
		]);
	}
}

/**
 * Load the sample rate converter WASM module and make it accessible module-wide
 *
 */
async function init(
	converterType,
	nChannels,
	inputSampleRate,
	outputSampleRate,
	wasmPath
) {
	resampler = await create(nChannels, inputSampleRate, outputSampleRate, {
		converterType: converterType,
		wasmPath: wasmPath,
	});
}
