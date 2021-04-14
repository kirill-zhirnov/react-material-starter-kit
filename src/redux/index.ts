import rootReducer from './reducers';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const middleware = [thunk, logger];

export default function makeStore(preloadedState = {}) {
	const store = configureStore({
		reducer: rootReducer,
		middleware,
		preloadedState
	});

	return store;
}