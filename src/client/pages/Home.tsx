import Container from '@material-ui/core/Container';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import {Helmet} from 'react-helmet-async';
import {useTranslation} from 'react-i18next';

export default function HomePage() {
	const {t} = useTranslation();

	return (
		<>
			<Helmet>
				<title>{t('homePage.title')}</title>
			</Helmet>
			<Container>
				<Typography>Home page is coming soon!</Typography>
			</Container>
		</>
	);
}