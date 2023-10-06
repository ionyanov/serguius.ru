export enum AppRoutes {
    MAIN = 'main',
    //Administration
    ADMIN_PANEL = 'admin_panel',
    ADMIN_USERS = 'admin_users',
    ADMIN_SETTINGS = 'admin_settings',
    ADMIN_CATEGORIES = 'admin_categories',

    FORBIDDEN = 'forbidden',
    // must be last
    NOTFOUND = 'notfound',
}

export const getRouteMain: () => string = () => '/';

export const getRouteAdmin: () => string = () => '/pictures';
export const getRouteAdminSettings: () => string = () => '/settings';
export const getRouteAdminUsers: () => string = () => '/users';
export const getRouteAdminCategories: () => string = () => '/categories';

export const getRouteForbidden: () => string = () => '/restrictaccess';
export const getRouteNotfound: () => string = () => '*';

export const getImagePath: (name: string | undefined) => string = (name: string | undefined) => `/images/public/${name}`;
