const webpack = require('webpack');

require('dotenv').config();

// const outputPath = path.resolve(__dirname, 'public/dist');
// const WebpackAssetsManifest = require('webpack-assets-manifest');

module.exports = {
	entry: {
		main: './src/client.tsx'
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.json']
	},
	module: {
		rules: [
			{
				test: /\.(png|jpe?g|gif|svg|eot|otf|woff|woff2|ttf)$/,
				use: [
					{
						loader: 'file-loader'
					},
				],
			},
		]
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env.I18N_LANG': JSON.stringify(process.env.I18N_LANG),
			'process.env.I18N_LOAD_LANG_ON_BUILD': ['1', 'true'].includes(process.env.I18N_LOAD_LANG_ON_BUILD)
		})
	]
};