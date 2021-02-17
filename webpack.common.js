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
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
				options: {
					compilerOptions: require('./tsconfig.json').compilerOptions
				}
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
					{ loader: 'style-loader' },
					{ loader: 'css-loader' }
				],
			},
			{
				test: /\.(png|jpe?g|gif|svg|eot|otf|woff|woff2|ttf)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							// outputPath: 'css/assets',
						},
					},
				],
			},
		]
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				I18N_LANG: JSON.stringify(process.env.I18N_LANG),
				I18N_LOAD_LANG_ON_BUILD: process.env.I18N_LOAD_LANG_ON_BUILD,
			}
		})
	]
};