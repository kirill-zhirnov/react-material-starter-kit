import React, {useState, MouseEvent} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {addPromise} from '../../../redux/reducers/xhr';
import {setUser} from '../../../redux/reducers/user';
import {RootState} from '../../../redux/reducers';
import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/Lock';
import {useTranslation} from 'react-i18next';
import {Link, withRouter, RouteComponentProps} from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {apiUserLogout} from '../../api/user';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

function ButtonsAtRight({user, setUser, addPromise, history}: ConnectedProps<typeof connector> & RouteComponentProps) {
	const {t} = useTranslation();
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const isProfileMenuOpen = Boolean(anchorEl);

	if (!user) {
		return (
			<Button color="inherit"
							startIcon={<LockIcon />}
							component={Link}
							to="/auth/login"
							className={'login-button'}
			>{t('login')}</Button>
		);
	}

	const handleProfileMenuClose = () => setAnchorEl(null);
	const handleProfileMenuOpen = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
	const handleLogout = () => {
		setAnchorEl(null);

		const promise = apiUserLogout()
			.then(() => {
				setUser(null);
				history.push('/');
			});

		addPromise(promise);
	};

	return (
		<>
			<Button color="inherit"
							startIcon={<AccountCircle />}
							onClick={handleProfileMenuOpen}
							className={'login-button'}
			>{user.email}</Button>
			<IconButton className={'hamburger-button'}
									onClick={handleProfileMenuOpen}
			>
				<MenuIcon />
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				keepMounted
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				open={isProfileMenuOpen}
				onClose={handleProfileMenuClose}
			>
				<MenuItem onClick={() => {history.push('/tutor/dashboard');handleProfileMenuClose();}}>
					<ListItemIcon>
						<DashboardIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText primary={t('tutor.dashboard')} />
				</MenuItem>
				<MenuItem onClick={handleLogout}>
					<ListItemIcon>
						<ExitToAppIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText primary={t('logout')} />
				</MenuItem>
			</Menu>
		</>
	);
}

const connector = connect((state: RootState) => ({
	user: state.user.user
}), {setUser, addPromise});

export default withRouter(connector(ButtonsAtRight));