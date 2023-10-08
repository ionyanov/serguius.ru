import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserDataQuery } from './user.api';
import type { IUser } from './user.types';
import { type ThunkConfig } from '@/app/providers/StoreProvider';
import { StorageServices } from '@/shared/lib/auth.helper';

export const initAuthData = createAsyncThunk<IUser, void, ThunkConfig<string>>(
    'user/initAuthData',
    async (arg, thunkAPI) => {
        const userId = StorageServices.getUserFromStorage().id;
        if (!userId) {
            return thunkAPI.rejectWithValue('');
        }
        try {
            const response = await thunkAPI
                .dispatch(getUserDataQuery(userId))
                .unwrap();
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue('error');
        }
    },
);
