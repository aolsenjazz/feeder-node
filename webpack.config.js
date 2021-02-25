const path = require('path');
const fs = require('fs');
const AfterBuildPlugin = require('@fiverr/afterbuild-webpack-plugin');

/**
 * ./dist/feeder-node.js contains a reference to `self`; replace this reference to `self`
 * with `this` so that the library doesn't break in server-side-rendered applications
 */
function replaceSelfWithThis() {
	let filePath = path.resolve(__dirname, 'dist', 'feeder-node.js')

	fs.readFile(filePath, 'utf8', (err, data) => {
		if (err) return console.error(err);

		let newFileString = data.replace(/self/g, 'this');

		fs.writeFile(filePath, newFileString, 'utf8', (err) => { console.error(err) });
	});
}

let commonConfig = {
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-env', { targets: 'defaults' }]
						]
					}
				}
			},
		],
	},
	mode: 'production',
	plugins: [
		new AfterBuildPlugin(replaceSelfWithThis)
	]
}

let workletConfig = Object.assign({}, commonConfig, {
	entry: './src/feeder-node.worklet.js',
	output: {
		filename: 'feeder-node.worklet.js',
		path: path.resolve(__dirname, 'dist')
	},
});

let workerConfig = Object.assign({}, commonConfig, {
	entry: './src/feeder-node.worker.js',
	output: {
		filename: 'feeder-node.worker.js',
		path: path.resolve(__dirname, 'dist')
	},
});

let moduleConfig = Object.assign({}, commonConfig, {
	entry: './src/feeder-node-create.js',
	output: {
		filename: 'feeder-node.js',
		path: path.resolve(__dirname, 'dist'),
		library: 'FeederNode',
		libraryTarget: 'umd',
		globalObject: 'this'
	},
});

module.exports = [
	moduleConfig,
	workletConfig,
	workerConfig
];