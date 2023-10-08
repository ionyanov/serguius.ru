import { IUser } from "@/entities/User";
import cookie from 'js-cookie';
import { LOCALSTORAGE_USER_KEY, LOCALSTORAGE_REFRESH_KEY, LOCALSTORAGE_ACCESS_KEY } from "@/shared/const/localstorage";

export const StorageServices = {
    getUserFromStorage(): IUser {
        return (JSON.parse(localStorage.getItem(LOCALSTORAGE_USER_KEY) || '') || {}) as IUser;
    },

    setUserToStorage(data: IUser): void {
        localStorage.setItem(LOCALSTORAGE_USER_KEY, JSON.stringify(data));
    },

    getRefreshTokenFromStorage(): string {
        return cookie.get(LOCALSTORAGE_REFRESH_KEY) ?? '';
        //return localStorage.getItem(LOCALSTORAGE_REFRESH_KEY) ?? '';
    },

    getAccessTokensFromStorage(): string {
        return cookie.get(LOCALSTORAGE_ACCESS_KEY) ?? '';
        //return localStorage.getItem(LOCALSTORAGE_ACCESS_KEY) ?? '';
    },

    setTokensToStorage(props: any) {
        const { refreshToken, accessToken } = props
        cookie.set(LOCALSTORAGE_REFRESH_KEY, refreshToken, { expires: 7 });
        cookie.set(LOCALSTORAGE_ACCESS_KEY, accessToken, { expires: 1 });
        //localStorage.setItem(LOCALSTORAGE_REFRESH_KEY, props.refreshToken);
        //localStorage.setItem(LOCALSTORAGE_ACCESS_KEY, props.accessToken);
    },

    clearStorage() {
        localStorage.removeItem(LOCALSTORAGE_USER_KEY)
        localStorage.removeItem(LOCALSTORAGE_ACCESS_KEY)
        localStorage.removeItem(LOCALSTORAGE_REFRESH_KEY)
        cookie.remove(LOCALSTORAGE_ACCESS_KEY)
        cookie.remove(LOCALSTORAGE_REFRESH_KEY)
    }
}