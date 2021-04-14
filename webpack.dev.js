const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const path = require('path');

const WebpackAssetsManifest = require('webpack-assets-manifest');

const outputPath = path.resolve(__dirname, 'public/dist');

const out = merge(common, {
	mode: 'development',
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
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
				options: {
					compilerOptions: require('./tsconfig.json').compilerOptions
				},
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'sass-loader'
					},
				],
			},
			{
				test: /\.css$/,
				use: [
					{loader: 'style-loader'},
					{loader: 'css-loader'}
				],
			},
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new WebpackAssetsManifest({
			writeToDisk: true,
			output: `${outputPath}/manifest.json`,
			publicPath: true
		}),
	]
});

module.exports = out;