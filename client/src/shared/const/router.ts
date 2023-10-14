export enum AppRoutes {
    MAIN = 'main',
    //Administration
    ADMIN_USERS = 'admin_users',
    ADMIN_SETTINGS = 'admin_settings',
    ADMIN_CATEGORIES = 'admin_categories',
    ADMIN_LOGS = 'admin_logs',

    FORBIDDEN = 'forbidden',
    // must be last
    NOTFOUND = 'notfound',
}

export const getRouteMain: () => string = () => '/';
export const getRouteAdminSettings: () => string = () => '/settings';
export const getRouteAdminUsers: () => string = () => '/users';
export const getRouteAdminCategories: () => string = () => '/categories';
export const getRouteAdminLogs: () => string = () => '/logs';

export const getRouteForbidden: () => string = () => '/restrictaccess';
export const getRouteNotfound: () => string = () => '*';

export const getImagePath: (name: string | undefined) => string = (name: string | undefined) => `/images/public/${name}`;
export const getPreviewPath: (name: string | undefined) => string = (name: string | undefined) => `/images/preview/${name}`;
