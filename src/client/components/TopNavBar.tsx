import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';

import {Link} from 'react-router-dom';
import ButtonsAtRight from './topNavbar/ButtonsAtRight';

export default function TopNavBar() {
	return (
		<AppBar position={'static'}
						color={'transparent'}
		>
			<Toolbar variant="dense">
				<Container className={'d-flex align-items-center'}>
					<Link to={'/'} className={'fw-bold text-decoration-none text-dark fs-6'}>
						Logo
					</Link>
					<div className={'ms-auto'}>
						<ButtonsAtRight/>
					</div>
				</Container>
			</Toolbar>
		</AppBar>
	);
}

