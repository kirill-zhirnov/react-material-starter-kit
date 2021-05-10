import {Action, combineReducers} from 'redux';
import xhrReducers from './reducers/xhr';
import userReducers from './reducers/user';
import errorReducers from './reducers/error';
import alertReducers from './reducers/alert';
import {ThunkAction} from '@reduxjs/toolkit';

const rootReducer = combineReducers({
	xhr: xhrReducers,
	user: userReducers,
	error: errorReducers,
	alert: alertReducers
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;