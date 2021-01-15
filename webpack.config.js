const path = require('path');

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
			}
		],
	},
	mode: 'production',
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
	},
});

module.exports = [
	moduleConfig,
	workletConfig,
	workerConfig
];