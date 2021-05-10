import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IReduxUser} from '../../@types/user';

const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: null
	} as IUserState,
	reducers: {
		setUser(state, action: PayloadAction<IReduxUser | null>) {
			state.user = action.payload;
		}
	}
});

export const {setUser} = userSlice.actions;

export default userSlice.reducer;

export interface IUserState {
	user: null | IReduxUser
}