# FeederNode

![AppVeyor](https://img.shields.io/appveyor/build/aolsenjazz/feeder-node)   [![Coverage Status](https://coveralls.io/repos/github/aolsenjazz/feeder-node/badge.svg?branch=master)](https://coveralls.io/github/aolsenjazz/feeder-node?branch=master)   [![Maintainability](https://api.codeclimate.com/v1/badges/b032545e996af9dbc61b/maintainability)](https://codeclimate.com/github/aolsenjazz/feeder-node/maintainability)   ![Depfu](https://img.shields.io/depfu/aolsenjazz/feeder-node)

FeederNode is a [pseudo](https://github.com/WebAudio/web-audio-api/issues/251)-[AudioNode](https://developer.mozilla.org/en-US/docs/Web/API/AudioNode) which can be fed audio data for instant playback. This library is ideal for consuming real-time audio data, e.g. data received from WebRTC or Websocket connections. Uses modern technologies such as WebAssembly, AudioWorklet, and Web Workers if they're available, falling back to more older systems if not.

#### Features:
- [AudioNode](https://developer.mozilla.org/en-US/docs/Web/API/AudioNode)-like API
- Super-fast, async resampling using [Web Assembly](https://webassembly.org/) and [Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
- [AudioWorklet](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorklet) by default, [ScriptProcessorNode](https://developer.mozilla.org/en-US/docs/Web/API/ScriptProcessorNode) when needed
- Highly configurable

## Installation

Install using NPM:
```bash
npm i @alexanderolsen/feeder-node
```
## Setup
To utilize Web Worker, WebAssembly, and AudioWorklet functionality, you **must** copy the helper files in */node_modules/@alexanderolsen/feeder-node/dist/* to where feeder-node can find them. The default location for these files is at the server root. This location can be changed using the following variables in the options dict passed into `createFeederNode()`:

```javascript
createFeederNode(context, nChannels, { 
	pathToWasm:    '/some/path/to/libsamplerate.wasm',     // default '/libsamplerate.wasm'
	pathToWorklet: '/some/path/to/feeder-node.worklet.js', // default '/feeder-node.worklet.js'
	pathToWorker:  '/some/path/to/feeder-node.worker.js'   // default '/feeder-node.worker.js'
});
```
See **Configuration** for more instructions on using the `options` dict.

## Usage

FeederNode expects to receive mono or interleaved multi-channel data. Any TypedArray can be used; values will be converted to `Float32`s where -1 < `sample` < 1.

### In modules:
```javascript
import { createFeederNode } from '@alexanderolsen/feeder-node'; 

let context   = new AudioContext();
let nChannels = 2;
let options = {}; // see **Configuration**

createFeederNode(context, nChannels, options)
	.then((feederNode) => {
		feederNode.connect(context.destination);
		feederNode.feed(new Float32Array(512));
	});
```
or
```javascript
const createFeederNode = require('@alexanderolsen/feeder-node').createfeederNode; 

(async function() {
	let context   = new AudioContext();
	let nChannels = 2;
	let options = {}; // see **Configuration**

	let feederNode = await createFeederNode(context, nChannels, options);
	feederNode.connect(context.destination);
	feederNode.feed(new Float32Array(512));
})();
```

### In HTML:
```html
<script src="https://cdn.jsdelivr.net/npm/@alexanderolsen/feeder-node"></script>
<script>
	var context   = new AudioContext();
	var nChannels = 2;
	var options = {}; // see **Configuration**

	FeederNode.createFeederNode(context, nChannels, options)
		.then((feederNode) => {
			feederNode.connect(context.destination);
			feederNode.feed(new Float32Array(512));
		});
	
</script>
```
Or use the feeder-node.js file in the *dist* folder:
```html
<script src="feeder-node.js"></script>
```

## Configuration

When creating a FeederNode instance, you have number of options available:

```javascript
let context   = new AudioContext();
let nChannels = 2;

// entries are defaults
let options = {
	inputSampleRate:     context.sampleRate, // Nothing surprising here

	batchSize:           (512 || 128), // Stuck at 128 for `AudioWorklet`s. 
	bufferThreshold:     4096,         // Number of samples to buffer before propagating to dstination
	bufferLength:        192000,       // Length of RingBuffer. See ring-buffer.js for more
	resampConverterType: 2,            // See **resampConverterType**

	pathToWorklet:       '/feeder-node.processor.js', // Set to location of your feeder-node.processor.js
	pathToWorker:        '/feeder-node.worker.js',    // Set to location of your feeder-node.worker.js
	pathToWasm:          '/libsamplrate.wasm.js'      // set to location of your libsamplerate.wasm
}

createFeederNode(context, nChannels, options).then((feederNode) => { ... });
```

#### `batchSize`
Modifies the batch size processed by `ScriptProcessorNode`. This does not affect `AudioWorklet`s as they're stuck at 128. If using ScriptProcessorNode, must be one of the following: `[256, 512, 1024, 2048, 4096, 8192, 16384]`.

#### `bufferThreshold`
FeederNode buffers this many samples (per channel) before propagating to the next `AudioNode` in the graph. Higher values (16000-32000) can be useful to guarantee seamless audio if playing back in real-time, though lower values result in lower latency. If FeederNode runs out of data, buffer this many sample again before propagating.

#### `bufferLength`
The total amount of data which can be buffered at a time. If you try to buffer more data than this, you'll end up overwriting older data.

#### `resampConverterType`
Converter types are as follows. More information can be found at the [libsamplerate website](http://www.mega-nerd.com/SRC/api_misc.html#Converters).
```javascript
const ConverterType = {
	SRC_SINC_BEST_QUALITY: 0,   // highest quality, slowest
	SRC_SINC_MEDIUM_QUALITY: 1, // 
	SRC_SINC_FASTEST: 2,        // in-between
	SRC_ZERO_ORDER_HOLD: 3,     // poor quality, "blindingly" fast
	SRC_LINEAR: 4               // poor quality, "blindingly" fast
}
```

#### `inputSampleRate`
Sample rate of incoming data. Will automatically be resampled to AudioContext.sampleRate.

## API Reference

Once you've created the FeederNode using `createFeederNode()` or `FeederNode.createFeederNode()`, the returned object exposes:
### `connect`
```javascript
/**
 * Connects FeederNode to the specific destination AudioNode
 *
 * @param {AudioNode} destination The node to connect to
 */
connect(destination) { ... }
```

### `disconnect`
```javascript
/** Disconnects from the currently-connected AudioNode */
disconnect() { ... }
```

### `feed`
```javascript
/**
 * Feeds raw PCM audio data to the underlying node. Any kind of TypedArray can be submitted - FeederNode
 * will automatically convert to Float32 and scale to -1 < n < 1.
 *
 * @param {TypedArray} data Any TypedArray. Conversion will be done automatically
 */
feed(data) { ... }
```

### `getters`
```javascript
get bufferLength() { ... }
get nChannels() { ... }
get batchSize() { ... }

// e.g. let bufferLength = feederNode.bufferlength;
```

### `overrides`

It can be useful to get notified when FeederNode runs out of data, or has resumed playing:

```javascript
/** Overwrite these for Backend state callbacks */
onBackendReady() {}
onBackendPlaying() {}
onBackendStarved() {}

// e.g. feederNode.onBackendStarved = () => { console.log('feederNode ran out of data!' ) }
```

## Examples

Run any server ([http-server](https://www.npmjs.com/package/http-server), etc) from the project directory:
```bash
cd feeder-node
http-server
```
and visit *localhost:8080/examples/continuous* or *localhost:8080/examples/chunk-feeder* in a browser. Examples **must be** hosted from the root directory, as they need to access the files in *dist*.

## Building From Source

```bash
git clone https://github.com/aolsenjazz/feeder-node
cd feeder-node
npm run watch
```

Production files are placed in the *dist* directory.

## Uncaught (in promise) DOMException: The user aborted a request.
This super unhelpful error message occurs when FeederNode is unable to find your feeder-node.worklet.js. To fix this, make sure your `options.pathToWorklet` is set correctly and that the file is actually reachable at that location.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

Licenses are available in `LICENSE.md`.
