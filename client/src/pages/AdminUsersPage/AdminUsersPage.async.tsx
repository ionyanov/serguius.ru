import { type FC, lazy } from 'react';

export const AdminUsersPageAsync = lazy<FC>(
    async () => await import('./AdminUsersPage'),
);
