import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { Formik, Form, FormikHelpers } from 'formik';
import {fieldAttrs} from '../../../lib/utils';
import {useTranslation} from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import {Helmet} from 'react-helmet-async';
import {connect, ConnectedProps} from 'react-redux';
import {addPromise} from '../../../redux/reducers/xhr';
import {setUser} from '../../../redux/reducers/user';
import {apiUserLogin} from '../../api/user';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {StaticContext} from 'react-router';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import queryString from 'query-string';
import Alert from '@material-ui/lab/Alert';

function AuthLoginPage(
	{addPromise, setUser, history, location}: ConnectedProps<typeof connector> & RouteComponentProps<{}, StaticContext, {from?: string}>
) {
	const {t} = useTranslation();
	const [externalError, setExternalError] = useState<string | null>(null);

	const onSubmit = (values: ILoginFormValues, {setSubmitting, setErrors}: FormikHelpers<ILoginFormValues>) => {
		const promise = apiUserLogin(values.email, values.password)
			.then(({data: {user}}) => {
				setSubmitting(false);
				setUser(user);

				const redirectTo = location.state?.from ? location.state.from : '/';
				history.push(redirectTo);
			})
			.catch(({response: {data}}) => {
				setErrors(data);
				setSubmitting(false);
			});

		addPromise(promise);
	};

	useEffect(() => {
		const parsedSearch = queryString.parse(location.search);
		if (parsedSearch.error) {
			setExternalError(parsedSearch.error as string);
		}
	}, [location.search]);

	return (
		<>
			<Helmet>
				<title>{t('loginPage.title')}</title>
			</Helmet>
			<Container className={'auth-login-page'}>
				<Paper elevation={3} className={'auth-paper'}>
					{externalError &&
					<Alert severity="error" className={'mb-3'}>{externalError}</Alert>
					}
					<Typography variant="h5" gutterBottom>{t('loginPage.title')}</Typography>
					<LoginForm onSubmit={onSubmit}/>
				</Paper>
			</Container>
		</>
	);
}

const connector = connect(null, {addPromise, setUser});
export default withRouter(
	connector(AuthLoginPage)
);

export interface ILoginFormValues {
	email: string;
	password: string;
}

function LoginForm({onSubmit}: {onSubmit: (values: ILoginFormValues, formikHelpers: FormikHelpers<ILoginFormValues>) => void}) {
	const {t} = useTranslation();

	return (
		<Formik initialValues={{email: '', password: ''}} onSubmit={onSubmit}>
			{(formikProps) => (
				<Form>
					<Box mb={1}>
						<TextField label={t('email')}
											 type={'email'}
											 fullWidth={true}
											 required={true}
											 autoComplete="email"
											 {...fieldAttrs<ILoginFormValues>('email', formikProps)}
						/>
					</Box>
					<Box mb={2}>
						<TextField label={t('password')}
											 type="password"
											 autoComplete="current-password"
											 fullWidth={true}
											 {...fieldAttrs<ILoginFormValues>('password', formikProps)}
						/>
					</Box>
					<div className={'text-end'}>
						<ButtonGroup>
							<Button color="primary"
											variant="contained"
											type={'submit'}
											endIcon={<LockOpenIcon />}
											disabled={formikProps.isSubmitting}
							>
								{t('login')}
							</Button>
						</ButtonGroup>
					</div>
				</Form>
			)}
		</Formik>
	);
}