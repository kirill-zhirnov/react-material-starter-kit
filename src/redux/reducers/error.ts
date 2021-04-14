import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: IErrorState = {
	status: null,
	message: null
};

const errorSlice = createSlice({
	name: 'error',
	initialState,
	reducers: {
		setError(state, action: PayloadAction<Partial<IErrorState>>) {
			// Object.assign(state, action.payload);
			return {...state, ...action.payload};
		},
		reset(state) {
			return {...state, ...initialState};
		}
	}
});

export const {setError, reset} = errorSlice.actions;

export default errorSlice.reducer;

export interface IErrorState {
	status: null|number;
	message: null|string;
}