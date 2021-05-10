import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import {Helmet} from 'react-helmet-async';
import {useTranslation} from 'react-i18next';

export default function DashboardIndex() {
	const {t} = useTranslation();

	return (
		<>
			<Helmet>
				<title>{t('dashboard.title')}</title>
			</Helmet>
			<Container>
				<Typography>Dashboard is coming soon</Typography>
			</Container>
		</>
	);
}