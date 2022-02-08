import React, {useState, useEffect} from 'react';
import Container from '@material-ui/core/Container';
import {Helmet} from 'react-helmet-async';
import {BoundlessCheckout} from 'boundless-checkout-react';
import {BoundlessClient} from 'boundless-api-client';
import Button from '@material-ui/core/Button';
import {useLocation} from 'react-router-dom';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const api = new BoundlessClient(process.env.BOUNDLESS_API_PERMANENT_TOKEN, process.env.BOUNDLESS_API_BASE_URL);
api.setInstanceId(process.env.BOUNDLESS_INSTANCE_ID as unknown as number);
api.setS3FolderPrefix(process.env.BOUNDLESS_S3_PREFIX as unknown as string);

const cartId = 'cb2d7dbd-9c96-41c5-8078-d94f4fa8f181';

export default function CheckoutIndex() {
	const location = useLocation();
	const [showCheckout, setShowCheckout] = useState(false);

	useEffect(() => {
		const pathname = String(location.pathname);
		if (
			!showCheckout
			&& pathname.startsWith('/checkout')
			&& ['info'].includes(pathname.replace('/checkout/', ''))
		) {
			setShowCheckout(true);
		}
	}, []);

	return (
		<>
			<Helmet>
				<title>Welcome to the checkout page. Dont forget about the title :)</title>
			</Helmet>
			<Container>
				<Button color={'primary'}
								variant="contained"
								onClick={() => setShowCheckout(true)}
				>
					Open checkout
				</Button>
				<BoundlessCheckout cartId={cartId}
													 show={showCheckout}
													 onHide={() => setShowCheckout(false)}
													 basename={'/checkout'}
													 api={api}
													 logo={'My super store'}
				/>
			</Container>
		</>
	);
}