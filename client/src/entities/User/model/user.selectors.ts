import { type IUser } from './user.types';
import { StateSchema } from '@/app/providers/StoreProvider';

export const getUserAuthData: (state: StateSchema) => IUser | undefined = (
    state: StateSchema,
) => {
    return state?.user.authData;
};

export const getUserIsInit: (state: StateSchema) => boolean = (
    state: StateSchema,
) => {
    return state?.user.isInit ?? false;
};

