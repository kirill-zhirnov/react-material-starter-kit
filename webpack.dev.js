const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const path = require('path');

const outputPath = path.resolve(__dirname, 'public/dist');

const out = merge(common, {
	mode: 'development',
	watch: true,
	output: {
		publicPath: 'http://localhost:9000/',
		filename: '[name].bundle.js',
		chunkFilename: '[name].bundle.js?ver=[chunkhash]',
		path: outputPath,
	},
	devServer: {
		// contentBase: outputPath,
		compress: true,
		port: 9000,
		hot: true,
		clientLogLevel: 'debug',
		// disableHostCheck: true,
		// host: '127.0.0.1',
		headers: {
			'Access-Control-Allow-Origin': '*'
		},
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development'),
			}
		}),
	]
});

module.exports = out;