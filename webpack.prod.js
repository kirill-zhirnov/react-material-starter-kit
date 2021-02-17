const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

// const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const outputPath = path.resolve(__dirname, 'public/dist');
const WebpackAssetsManifest = require('webpack-assets-manifest');

const out = merge(common, {
	mode: 'production',
	output: {
		publicPath: '/dist/',
		filename: '[name].[hash].js',
		// filename: '[name].bundle.js?ver=[chunkhash]',
		// chunkFilename: '[name].bundle.js?ver=[chunkhash]',
		path: outputPath,
	},
	// module: {
	// 	rules: [
	// 		{
	// 			test: /\.(sass|css)$/i,
	// 			use: [MiniCssExtractPlugin.loader, 'css-loader'],
	// 		},
	// 	],
	// },
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
			}
		}),
		// new MiniCssExtractPlugin({
		// 	filename: '[name].[hash].css',
		// 	chunkFilename: '[id].[hash].css',
		// }),
		// new HtmlWebpackPlugin({
		// 	inject: false,
		// 	xhtml: true,
		// 	scriptLoading: 'defer',
		// 	templateContent: ({htmlWebpackPlugin}) => {
		// 		return `
		// 			${htmlWebpackPlugin.tags.headTags}
		// 			<br/>
		// 			${htmlWebpackPlugin.tags.bodyTags}
		// 		`;
		// 	}
		// }),
		new WebpackAssetsManifest({
			writeToDisk: true,
			output: `${outputPath}/manifest.json`
		}),
	],
	// optimization: {
	// 	splitChunks: {
	// 		chunks: 'all',
	// 	}
	// }
});

module.exports = out;