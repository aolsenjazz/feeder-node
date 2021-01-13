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
			},
			{
				test: /feeder-node.worker.js/,
				use: { loader: 'worker-loader' }
			}
		],
	},
	entry: './src/feeder-node.js',
	mode: 'production',
	output: {
		filename: 'feeder-node.js',
		path: path.resolve(__dirname, 'dist'),
		library: 'FeederNode',
		libraryExport: 'default',
		libraryTarget: 'umd',

	}
}


module.exports = commonConfig