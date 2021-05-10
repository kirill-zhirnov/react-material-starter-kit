import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '../../../redux/reducers';
import Container from '@material-ui/core/Container';
import {Helmet} from 'react-helmet-async';
import {useTranslation} from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import {
	Route
} from 'react-router-dom';

function Page404({user}: ConnectedProps<typeof connector>) {
	const {t} = useTranslation();

	return (
		<Route render={({staticContext}) => {
				if (staticContext) {
					staticContext.statusCode = 404;
				}

				return (
					<Container>
						<Helmet>
							<title>{t('system.pageNotFound')}</title>
						</Helmet>
						<div className={'page-404'}>
							<Typography variant="h2" component="h1" gutterBottom>
								{t('system.pageNotFound')}
							</Typography>
							<Typography variant="h4"
													component="h1"
													gutterBottom
													className={'text-center'}
							>
								{t('system.tryStartWith')}
								{user ?
									<Button color="primary"
													variant="contained"
													startIcon={<DashboardIcon />}
													component={Link}
													to="/tutor/dashboard"
													className={'ml-3'}
									>{t('tutor.dashboard')}</Button>
									:
									<Button color="primary"
													variant="contained"
													startIcon={<HomeIcon />}
													component={Link}
													to="/"
													className={'ml-3'}
									>{t('system.homePage')}</Button>
								}
							</Typography>
						</div>
					</Container>
				);
			}}
		/>
	);
}

const connector = connect((state: RootState) => ({
	user: state.user.user
}));

export default connector(Page404);