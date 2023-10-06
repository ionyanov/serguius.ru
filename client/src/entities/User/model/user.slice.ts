import { type PayloadAction } from '@reduxjs/toolkit';
import { buildSlice } from '@/shared/lib/store';
import { initAuthData } from './user.services';
import { type IUser, type IUserSchema } from './user.types';
import { StorageServices } from '@/shared/helpers/auth.helper';

const initialState: IUserSchema = {
    isInit: false,
};

export const userSlice = buildSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<IUser>) => {
            state.authData = action.payload;
            StorageServices.setUserToStorage(action.payload)
            state.isInit = true;
        },
        logout: (state) => {
            StorageServices.clearStorage();
            state.authData = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                initAuthData.fulfilled,
                (state, action: PayloadAction<IUser>) => {
                    state.authData = action.payload;
                    state.isInit = true;
                },
            )
            .addCase(initAuthData.rejected, (state) => {
                state.isInit = true;
            });
    },
});

export const {
    actions: userActions,
    reducer: userReducer,
    useActions: useUserActions,
} = userSlice;
