import BasicController from './basic';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import ClientApp from '../../client/App';
import React from 'react';
import makerStore from '../../redux';
import {Provider} from 'react-redux';
import {HelmetProvider, HelmetData} from 'react-helmet-async';
import fs from 'fs';
import registry from 'simple-registry';
import {initI18n} from '../../i18n/funcs';
import util from 'util';
import {ServerStyleSheets} from '@material-ui/core/styles';

const readFile = util.promisify(fs.readFile);

export default class ReactController extends BasicController {
	async renderServerSide(): Promise<boolean> {
		const store = makerStore(this.createInitialState()),
			routerContext: { url?: string; statusCode?: number; } = {},
			helmetContext: { helmet?: HelmetData } = {}
		;

		initI18n();
		const serverSideRendering = registry.get('serverSideRendering');
		// const sheets = new ServerStyleSheets();
		//
		// let staticRender = ReactDOMServer.renderToString(
		// 	sheets.collect(
		// 		<HelmetProvider context={helmetContext}>
		// 			<Provider store={store}>
		// 				<StaticRouter location={this.request.url} context={routerContext}>
		// 					<ClientApp/>
		// 				</StaticRouter>
		// 			</Provider>
		// 		</HelmetProvider>
		// 	)
		// );
		//
		// if (routerContext.url) {
		// 	this.response.redirect(301, routerContext.url);
		// 	return true;
		// } else if (!staticRender.length) {
		// 	return false;
		// }
		//
		// if (routerContext.statusCode) {
		// 	this.response.status(routerContext.statusCode);
		// }
		let staticRender = '';

		const finalState = store.getState();

		let titleTag = '';
		if (helmetContext.helmet) {
			titleTag = helmetContext.helmet.title.toString();
		}

		const clientConfig = JSON.stringify({
			serverSideRendering: serverSideRendering,
			preloadedState: finalState
		}).replace(
			/</g,
			'\\u003c'
		);

		//turning off server side rendering speed up the development process - you don't need to reload
		//server on client's files change.
		if (!serverSideRendering) {
			staticRender = '';
		}

		// const jss = serverSideRendering ? sheets.toString() : false;
		const jss = false;
		const {stylesSrc, scriptsSrc} = await this.extractAssetPaths();

		this.response.render('index', {
			titleTag,
			staticRender,
			clientConfig,
			stylesSrc,
			scriptsSrc,
			jss
		});

		return true;
	}

	createInitialState(): {} {
		return {
			user: {
				user: this.getReduxUser()
			},
		};
	}

	async extractAssetPaths(): Promise<{stylesSrc: string[], scriptsSrc: string[]}> {
		const stylesSrc = [];
		const scriptsSrc = [];

		const manifestPath = `${registry.get('rootPath')}/public/dist/manifest.json`;
		if (fs.existsSync(manifestPath)) {
			try {
				const content = await readFile(manifestPath, {encoding: 'utf8'});
				const manifest = JSON.parse(content);

				if (manifest['main.js']) {
					scriptsSrc.push(manifest['main.js']);
				}

				if (manifest['main.css']) {
					stylesSrc.push(manifest['main.css']);
				}
			} catch (e) {
				console.error('Error parsing manifest.json:', e);
			}
		}

		return {
			stylesSrc,
			scriptsSrc
		};
	}
}