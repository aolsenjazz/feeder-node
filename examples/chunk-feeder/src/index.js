import React from 'react';
import ReactDOM from 'react-dom';

import createFeederNode from '../../../dist/feeder-node.js';

import { useState, useEffect, useCallback } from 'react';
import { WaveFile } from 'wavefile';

import { toFloat32 } from './util';

// see feed()
let offset = 0;

function App() {
	const [nChannels, setNChannels]   = useState(undefined);
	const [samples, setSamples]       = useState(undefined);
	const [wav, setWav]               = useState(new WaveFile());
	const [context, setContext]       = useState(undefined);
	const [feederNode, setFeederNode] = useState(undefined);

	// read the file
	const [reader, setReader] = useState(new FileReader());
	useEffect(() => {
		document.getElementById('id').onchange = (e) => reader.readAsDataURL(e.target.files[0]);

		reader.onload = function(e) {
			let safariFixed = e.target.result.split('base64,')[1]; // safari reads wav as wav-x, which breaks WaveFile
			wav.fromBase64(safariFixed);

			let intSamples = wav.getSamples(true, Int16Array);
			setSamples(toFloat32(intSamples));
		}
	});

	// feed some audio to FeederNode
	const feed = useCallback(async () => {
		// Create an AudioContext if necessary
		let ctx = context;
		if (!context) {
			let AudioCtx = window.AudioContext || window.webkitAudioContext;
			ctx = new AudioCtx({sampleRate: wav.fmt.sampleRate});
			setContext(ctx);
		}

		// Create the FeederNode if necessary
		let feeder = feederNode;
		if (!feederNode) {
			// Create the FeederNode
			feeder = await createFeederNode(ctx, wav.fmt.numChannels, {
				inputSampleRate: wav.fmt.sampleRate,
				pathToWorklet: '/dist/feeder-node.worklet.js',
				pathToWorker: '/dist/feeder-node.worker.js',
				pathToWasm: '/dist/libsamplerate.wasm'
			});
			setFeederNode(feeder);
			feeder.connect(ctx.destination);
		}

		// prepare some data to feed it
		let data = new Float32Array(wav.fmt.sampleRate * wav.fmt.numChannels);
		
		for (let i = 0; i < data.length; i++) {
			if (offset >= samples.length) return;

			data[i] = samples[offset++];
		}

		// finally, feed it the data
		feeder.feed(data);
	});
	
	return (
	<div className="App">
		<div>
			<h1>FeederNode React Example</h1>
			<input id="id" type="file" accept="audio" /><br></br><br></br>
			<button onClick={feed}>Start</button>
		</div>
		
	</div>
	);
}

ReactDOM.render(<App />, document.getElementById('root'))
