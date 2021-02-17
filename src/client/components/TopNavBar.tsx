import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import {Link} from 'react-router-dom';
import ButtonsAtRight from './topNavbar/ButtonsAtRight';

// import logo from '../../../assets/images/logo.png';

export default function TopNavBar() {
	return (
		<AppBar position={'static'}
						color={'transparent'}
						className={'top-nav-bar'}
		>
			{/*<Container>*/}
			<Toolbar className={'toolbar'}
							 variant="dense"
			>
				<Link to={'/'} className={'logo'}>
					Logo
					{/*<img src={logo}*/}
					{/*		 alt={t('logo')}*/}
					{/*		 width={180}*/}
					{/*		 height={49}*/}
					{/*/>*/}
				</Link>
				<div className={'ms-auto right-side'}>
					<ButtonsAtRight />
				</div>
			</Toolbar>
			{/*</Container>*/}
		</AppBar>
	);
}

