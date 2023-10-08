import { rtkAPI } from '@/shared/api/rtkAPI';
import { LoginResponse, LoginRequest } from './login.type';

const userAdminApi = rtkAPI.injectEndpoints({
	endpoints: (build) => ({
		Login: build.mutation<LoginResponse, LoginRequest>({
			query: (data) => ({
				url: '/login',
				method: 'POST',
				body: data
			}),
		}),
	}),
});

export const { useLoginMutation } = userAdminApi;