import React, {useEffect} from 'react';
import {Switch} from 'react-router-dom';
import AppRoute from './routes/AppRoute';

import AuthLoginPage from './pages/auth/Login';
import LoadingLine from './components/LoadingLine';
import HomePage from './pages/Home';
import Page404 from './pages/system/Page404';

export default () => {
	useEffect(() => {
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement?.removeChild(jssStyles);
		}
	}, []);

	return (
		<>
			<LoadingLine />
			<Switch>
				<AppRoute exact path="/" component={HomePage} />
				<AppRoute path="/auth/login" component={AuthLoginPage} />
				<AppRoute component={Page404} />
			</Switch>
		</>
	);
};