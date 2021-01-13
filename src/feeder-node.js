import ScriptProcessorBackend from './script-processor-backend';
import AudioWorkletBackend from './audio-worklet-backend';

import MainThreadResampler from './main-thread-resampler';
import WorkerResampler from './worker-resampler';

import { BackendState } from './abstract-backend';
import { ConverterType } from '@alexanderolsen/libsamplerate-js'

import { toFloat32, checkFileExists } from './util';

export default class FeederNode {
	constructor(context, options={}) {
		this.context = context;

		let resampleAsync       = options.resampleAsync === undefined ? true : options.resampleAsync;
		let batchSize           = options.batchSize || (window.AudioWorklet !== undefined ? 128 : 512);
		let bufferThreshold     = options.bufferThreshold || 4096;
		let nChannels           = options.nChannels || 2;
		let bufferLength        = options.bufferLength || 192000;
		let resampConverterType = options.resampConverterType || ConverterType.SRC_SINC_FASTEST;
		
		let pathToWorkletProcessor = '/feeder-node.processor.js';
		let pathToWorker = '/feeder-node.worker.js';

		this.inputSampleRate = options.inputSampleRate || context.sampleRate;
		this.outputSampleRate = context.sampleRate;

		// init MessageChannel if using both async resampler and backend
		this.messageChannel = {port1: undefined, port2: undefined};
		if (resampleAsync && window.AudioWorklet !== undefined) {
			this.messageChannel = new MessageChannel();
		}

		// init resampler
		let Resampler;
		if (resampleAsync) {
			checkFileExists(pathToWorker);
			Resampler = WorkerResampler;
		} else {
			Resampler = MainThreadResampler;
		}
		this._resampler = new Resampler(
			this.inputSampleRate, 
			this.outputSampleRate,
			nChannels,
			this._onResampleComplete.bind(this),
			this.messageChannel.port1, // ignored by MainThreadResampler
			resampConverterType // ignored by MainThreadResampler
		);

		// init backend
		let Backend;
		if (window.AudioWorklet !== undefined) {
			checkFileExists(pathToWorkletProcessor);
			Backend = AudioWorkletBackend;
		} else {
			Backend = ScriptProcessorBackend;
		}
		this._backend = new Backend(
			context, 
			batchSize, 
			nChannels, 
			bufferLength, 
			bufferThreshold,
			this._onBackendStateChange.bind(this),
			this.messageChannel.port2, // ignored by ScriptProcessorBackend
			pathToWorkletProcessor // ignored by ScriptProcessorBackend
		);
	}

	/** getters */
	get bufferLength() { return this._backend.bufferLength; }
	get nChannels() { return this._backend.nChannels; }
	get batchSize() { return this._backend.batchSize; }

	/**
	 * Connects FeederNode to the specific output AudioNode
	 *
	 * @param {AudioNode} output The node to connect to
	 */
	connect(output) {
		this._backend.connect(output);
	}

	/** Disconnects from the currently-connected AudioNode */
	disconnect() {
		this._backend.disconnect();
	}

	/**
	 * Feeds raw PCM audio data to the underlying node. Any kind of TypedArray can be submitted - FeederNode
	 * will automatically convert to Float32 and scale to -1 < n < 1.
	 *
	 * @param {ArrayBuffer} TypedArray or ArrayBuffer representing typed array. Can be any TypedArray
	 */
	feed(data) {
		let parsedData;

		if (ArrayBuffer.isView(data)) {
			parsedData = toFloat32(data);
		} else {
			throw Error(`FeederNode.feed() must receive an instance of TypedArray. You passed ${data.constructor}`);
		}

		this._resampler.processBatch(parsedData);
	}

	/** Override these for Backend state callbacks */
	onBackendReady() {}
	onBackendPlaying() {}
	onBackendStarved() {}

	/**
	 * Called by this._resampler if this.messageChannel isn't in use to transfer data from the
	 * resampler to the backend
	 *
	 * @param {Float32Array} float32Array array containing resampled, interleaved audio data
	 */
	_onResampleComplete(float32Array) {
		this._backend.feed(float32Array);
	}

	/**
	 * Called by the back whenever its state changes
	 *
	 * @param { BackendState } state one of [BackendState.READY, BackendState.PLAYING, BackendState.STARVED]
	 */
	_onBackendStateChange(state) {
		switch (state) {
			case BackendState.READY:
				return this.onBackendReady();
			case BackendState.PLAYING:
				return this.onBackendPlaying();
			case BackendState.STARVED:
				return this.onBackendStarved();
			default:
				throw `unknown state ${state}`;
		}
	}
}

