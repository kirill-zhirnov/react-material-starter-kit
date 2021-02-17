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
		const sheets = new ServerStyleSheets();

		let staticRender = ReactDOMServer.renderToString(
			sheets.collect(
				<HelmetProvider context={helmetContext}>
					<Provider store={store}>
						<StaticRouter location={this.request.url} context={routerContext}>
							<ClientApp/>
						</StaticRouter>
					</Provider>
				</HelmetProvider>
			)
		);

		if (routerContext.url) {
			//тк мы не храним юзер на сервере больше, то запросы на админку - будут
			//всегда с редиректом - это отстой.
			//Вместо редиректа - мы просто отключаем сервер-сайд рендеринг.
			// serverSideRendering = false;
			this.response.redirect(301, routerContext.url);
			return true;
		} else if (!staticRender.length) {
			return false;
		}

		if (routerContext.statusCode) {
			this.response.status(routerContext.statusCode);
		}

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

		const jss = serverSideRendering ? sheets.toString() : false;

		const styleTags = '';
		let scriptTags = ['http://localhost:9000/main.bundle.js'];

		const manifestPath = `${registry.get('rootPath')}/public/dist/manifest.json`;
		if (['production', 'staging'].includes(process.env.NODE_ENV as unknown as string) && fs.existsSync(manifestPath)) {
			const content = await readFile(manifestPath, {encoding: 'utf8'});

			try {
				const manifest = JSON.parse(content);

				if (manifest['main.js']) {
					scriptTags = [`/dist/${manifest['main.js']}`];
				}
			} catch (e) {
				console.error('React controller - parse manifest', e);
			}
		}

			// htmlWebpackPluginFile = `${registry.get('rootPath')}/public/dist/index.html`
		// if (!registry.get('isDev') && fs.existsSync(htmlWebpackPluginFile)) {
		// 	const content = await readFile(htmlWebpackPluginFile, {encoding: 'utf8'});
		// 	[styleTags, scriptTags] = content.split('<br/>');
		// }

		this.response.render('index', {
			titleTag,
			staticRender,
			clientConfig,
			styleTags,
			scriptTags,
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
}