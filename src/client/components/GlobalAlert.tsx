import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/reducers';
import {hideAlert, resetAlert} from '../../redux/reducers/alert';

export default function GlobalAlert() {
	const {alert, show} = useSelector((state: RootState) => state.alert);
	const dispatch = useDispatch();

	const handleClose = () => dispatch(hideAlert());
	const handleExited = () => dispatch(resetAlert());

	return (
		<Snackbar
			open={show}
			autoHideDuration={3000}
			onClose={handleClose}
			onExited={handleExited}
			anchorOrigin={{vertical: 'top', horizontal: 'right'}}
		>
			<Alert variant='filled' severity={alert.type}>
				{(alert.title && alert.text)
					? <>
						<AlertTitle>{alert.title}</AlertTitle>
						{alert.text}
					</>
					: <>{alert.title}</>
				}
			</Alert>
		</Snackbar>
	);
}
