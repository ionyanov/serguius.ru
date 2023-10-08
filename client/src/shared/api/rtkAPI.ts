import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { StorageServices } from '../lib/auth.helper';
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';

// Create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env?._API_URL_,
    prepareHeaders: (headers) => {
        const token = StorageServices.getAccessTokensFromStorage();
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

const customFetchBase: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);
    if (result.error?.status == 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const refreshResult = await baseQuery(
                    {
                        url: '/refresh',
                        method: 'POST',
                        body: { refreshToken: StorageServices.getRefreshTokenFromStorage() }
                    },
                    api,
                    extraOptions
                );
                if (refreshResult.data) {
                    StorageServices.setTokensToStorage(refreshResult.data)
                    // Retry the initial query
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    StorageServices.clearStorage();
                    window.location.href = '/';
                }
            } finally {
                // release must be called once the mutex should be released again.
                release();
            }
        } else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result;
};

export const rtkAPI = createApi({
    reducerPath: 'rtkAPI',
    baseQuery: customFetchBase,
    endpoints: (builder) => ({}),
});