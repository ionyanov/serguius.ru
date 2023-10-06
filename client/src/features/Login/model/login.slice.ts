import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { LoginSchema } from './login.type';
import { loginByUsername } from './login.services';
import { StorageServices } from '@/shared/helpers/auth.helper';

const initialState: LoginSchema = {
	isLoading: false,
	username: '',
	password: '',
};

export const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		setUserName: (state, action: PayloadAction<string>) => {
			state.username = action.payload;
		},
		setPassword: (state, action: PayloadAction<string>) => {
			state.password = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginByUsername.pending, (state, action) => {
				state.error = '';
				state.isLoading = true;
			})
			.addCase(loginByUsername.fulfilled, (state, action) => {
				StorageServices.setUserToStorage(action.payload.user);
				state.isLoading = false;
			})
			.addCase(loginByUsername.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;