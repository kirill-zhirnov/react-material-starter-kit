const webpack = require('webpack');
const path = require('path');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const outputPath = path.resolve(__dirname, 'public/dist');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const CompressionPlugin = require('compression-webpack-plugin');
const zlib = require('zlib');

const out = merge(common, {
	mode: 'production',
	output: {
		publicPath: '/dist/',
		filename: '[name].[fullhash].js',
		// filename: '[name].bundle.js?ver=[chunkhash]',
		// chunkFilename: '[name].bundle.js?ver=[chunkhash]',
		path: outputPath,
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					},
					{
						loader: 'ts-loader',
						options: {
							compilerOptions: require('./tsconfig.json').compilerOptions
						},
					}
				]
			},
			{
				test: /\.scss$/,
				use: [
					{loader: MiniCssExtractPlugin.loader},
					{
						loader: 'css-loader',
					},
					{loader: 'postcss-loader'},
					{
						loader: 'sass-loader'
					},
				],
			},
			{
				test: /\.css$/,
				use: [
					{loader: MiniCssExtractPlugin.loader},
					{loader: 'css-loader'},
					{loader: 'postcss-loader'}
				],
			}
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[fullhash].css',
			chunkFilename: '[id].[fullhash].css',
		}),
		new CompressionPlugin(),
		new CompressionPlugin({
			filename: '[path][base].br',
			algorithm: 'brotliCompress',
			test: /\.(js|css|svg)$/,
			compressionOptions: {
				params: {
					[zlib.constants.BROTLI_PARAM_QUALITY]: 11,
				},
			},
			threshold: 10240,
			minRatio: 0.8,
			deleteOriginalAssets: false,
		}),
		new WebpackAssetsManifest({
			writeToDisk: true,
			output: `${outputPath}/manifest.json`
		}),
	]
});

module.exports = out;