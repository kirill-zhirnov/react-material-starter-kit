const webpack = require('webpack');
const path = require('path');

require('dotenv').config();

// const outputPath = path.resolve(__dirname, 'public/dist');
// const WebpackAssetsManifest = require('webpack-assets-manifest');

module.exports = {
	entry: {
		main: './src/client.tsx'
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.json'],
		alias: {
			react: path.resolve('./node_modules/react'),
			'react-dom': path.resolve('./node_modules/react-dom')
		}
	},
	module: {
		rules: [
			{
				test: /\.(png|jpe?g|gif|svg|eot|otf|woff|woff2|ttf)$/,
				type: 'asset'
				// use: [
				// 	{
				// 		loader: 'file-loader'
				// 	},
				// ],
			},
		]
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env.I18N_LANG': JSON.stringify(process.env.I18N_LANG),
			'process.env.I18N_LOAD_LANG_ON_BUILD': ['1', 'true'].includes(process.env.I18N_LOAD_LANG_ON_BUILD),
			'process.env.BOUNDLESS_API_BASE_URL': JSON.stringify(process.env.BOUNDLESS_API_BASE_URL),
			'process.env.BOUNDLESS_API_PERMANENT_TOKEN': JSON.stringify(process.env.BOUNDLESS_API_PERMANENT_TOKEN),
			'process.env.BOUNDLESS_INSTANCE_ID': JSON.stringify(process.env.BOUNDLESS_INSTANCE_ID),
			'process.env.BOUNDLESS_S3_PREFIX': JSON.stringify(process.env.BOUNDLESS_S3_PREFIX),
		})
	]
};