import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export enum TAlertType {
	success = 'success',
	error = 'error'
}

const initialState = {
	alert: {
		type: TAlertType.success,
		title: null,
		text: null
	},
	show: false
} as IAlertState;

const alertSlice = createSlice({
	name: 'alert',
	initialState,
	reducers: {
		hideAlert(state) {
			state.show = false;
		},
		resetAlert(state) {
			return {...state, ...initialState};
		},
		alertError(state, action: PayloadAction<IAlertPayload>) {
			const {title, text} = action.payload;

			state.show = true;
			state.alert = {
				type: TAlertType.error,
				title: title || null,
				text: text || null
			};
		},
		alertSuccess(state, action: PayloadAction<IAlertPayload>) {
			const {title, text} = action.payload;

			state.show = true;
			state.alert = {
				type: TAlertType.success,
				title: title || null,
				text: text || null
			};
		},
	}
});

export const {hideAlert, resetAlert, alertError, alertSuccess} = alertSlice.actions;

export default alertSlice.reducer;

export interface IAlertState {
	alert: IAlert;
	show: boolean;
}

export interface IAlert {
	type: TAlertType;
	title?: string | null;
	text?: string | null;
}

interface IAlertPayload {
	title?: string | null;
	text?: string | null;
}