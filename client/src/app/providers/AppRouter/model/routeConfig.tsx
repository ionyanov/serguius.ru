import { type AppRouteProps } from '@/shared/types/router';
import {
    AppRoutes,
    getRouteAdminCategories,
    getRouteAdminLogs,
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
import { AdminLogsPage } from '@/pages/AdminLogsPage';

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />,
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
    [AppRoutes.ADMIN_LOGS]: {
        path: getRouteAdminLogs(),
        element: <AdminLogsPage />,
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
