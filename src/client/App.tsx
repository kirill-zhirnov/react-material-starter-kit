import React, {useEffect} from 'react';
import {Switch} from 'react-router-dom';
import AppRoute from './routes/AppRoute';

import AuthLoginPage from './pages/auth/Login';
import LoadingLine from './components/LoadingLine';
import HomePage from './pages/Home';
import Page404 from './pages/system/Page404';
import DashboardIndex from './pages/dashboard/Index';
import CheckoutIndex from './pages/checkout/Index';

const App = () => {
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
				<AppRoute path="/dashboard" component={DashboardIndex} />
				<AppRoute path="/checkout" component={CheckoutIndex} />
				<AppRoute component={Page404} />
			</Switch>
		</>
	);
};
export default App;