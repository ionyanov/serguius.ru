import { createAsyncThunk } from '@reduxjs/toolkit';
import { type IUser, userActions } from '@/entities/User';
import { type ThunkConfig } from "@/app/providers/StoreProvider";
import { type LoginRequest, LoginResponse } from './login.type';
import { StorageServices } from '@/shared/helpers/auth.helper';

export const loginByUsername = createAsyncThunk<
	LoginResponse,
	LoginRequest,
	ThunkConfig<string>
>('login', async (authData, thunkAPI) => {
	try {
		const response = await thunkAPI.extra.api.post<LoginResponse>(
			'/login',
			authData,
		);
		if (!response.data) {
			return thunkAPI.rejectWithValue('no data');
		}
		StorageServices.setTokensToStorage(response.data)
		thunkAPI.dispatch(userActions.setAuthData(response.data.user));
		return response.data;
	} catch (e) {
		return thunkAPI.rejectWithValue('error');
	}
	/*
	
		setPassword: build.mutation<IUser, IChangePassword>({
			query: (user) => ({
				url: `/user/password`,
				method: 'POST',
				body: user
			}),
		}),
		 */
});
