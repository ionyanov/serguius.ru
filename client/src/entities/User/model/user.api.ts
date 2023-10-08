import { rtkAPI } from '@/shared/api/rtkAPI';
import type { IUser } from './user.types';

const userApi = rtkAPI.injectEndpoints({
    endpoints: (build) => ({
        getUserData: build.query<IUser, number>({
            query: (userId) => ({
                url: `/profile/${userId}`,
                method: 'GET'
            }),
        }),
        setUserData: build.mutation<IUser, IUser>({
            query: (user) => ({
                url: `/user/${user.id}`,
                method: 'PATCH',
                body: user
            }),
        }),
    }),
});

export const { useGetUserDataQuery } = userApi;

export const getUserDataQuery = userApi.endpoints.getUserData.initiate