import ReactDom from 'react-dom';
import App from './client/App';
import React, {Suspense} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import makeStore from './redux/index';
import {HelmetProvider} from 'react-helmet-async';
import {initI18n} from './i18n/funcs';
import {RootState} from './redux/reducers';
import Spinner from './client/components/Spinner';

initI18n();

import 'animate.css/animate.css';
import 'fontsource-roboto';
import '../styles/styles.scss';

const config = window['__APP__'];
const store = makeStore(config.preloadedState);

const app = (
		<Suspense fallback={<Spinner />}>
			<HelmetProvider>
				<Provider store={store}>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</Provider>
			</HelmetProvider>
		</Suspense>
	),
	$rootElement = document.getElementById('root')
;

if (config.serverSideRendering) {
	ReactDom.hydrate(app, $rootElement);
} else {
	ReactDom.render(app, $rootElement);
}

export interface IClientStartupData {
	serverSideRendering: boolean;
	preloadedState: RootState
}

declare global {
	interface Window {
		__APP__: IClientStartupData;
	}
}