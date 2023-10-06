import { type AppRouteProps } from '@/shared/types/router';
import {
    AppRoutes,
    getRouteAdmin,
    getRouteAdminCategories,
    getRouteAdminSettings,
    getRouteAdminUsers,
    getRouteForbidden,
    getRouteMain,
    getRouteNotfound,
} from '@/shared/const/router';
import {
    MainPage,
    AdminUsersPage,
    AdminSettingsPage,
    AdminCategoryesPage,
    ForbiddenPage,
    NotFoundPage,
} from '@/pages';

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />,
    },

    [AppRoutes.ADMIN_PANEL]: {
        path: getRouteAdmin(),
        element: <MainPage />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_USERS]: {
        path: getRouteAdminUsers(),
        element: <AdminUsersPage />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_SETTINGS]: {
        path: getRouteAdminSettings(),
        element: <AdminSettingsPage />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_CATEGORIES]: {
        path: getRouteAdminCategories(),
        element: <AdminCategoryesPage />,
        authOnly: true,
    },

    [AppRoutes.FORBIDDEN]: {
        path: getRouteForbidden(),
        element: <ForbiddenPage />,
    },
    [AppRoutes.NOTFOUND]: {
        path: getRouteNotfound(),
        element: <NotFoundPage />,
    },
};
