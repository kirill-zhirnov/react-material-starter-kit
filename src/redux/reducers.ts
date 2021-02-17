import { combineReducers } from 'redux';
import xhrReducers from './reducers/xhr';
import userReducers from './reducers/user';

const rootReducer = combineReducers({
	xhr: xhrReducers,
	user: userReducers
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;