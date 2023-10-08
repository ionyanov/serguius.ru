import { rtkAPI } from '@/shared/api/rtkAPI';
import type { IAdminUser, IChangePassword, IUser } from './user.types';

const tag = 'UserAdmin';
const userAdminApi = rtkAPI.enhanceEndpoints({ addTagTypes: [tag] }).injectEndpoints({
    endpoints: (build) => ({
        getAllUsersData: build.query<IAdminUser[], void>({
            query: () => ({
                url: `/user`,
                method: 'GET'
            }),
            providesTags: [tag]
        }),
        updateUserData: build.mutation<IAdminUser, IAdminUser>({
            query: (user) => ({
                url: `/user`,
                method: 'POST',
                body: user
            }),
            invalidatesTags: [tag]
        }),
    }),
});

export const { useGetAllUsersDataQuery, useUpdateUserDataMutation } = userAdminApi;