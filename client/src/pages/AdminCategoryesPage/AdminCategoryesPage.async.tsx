import { type FC, lazy } from 'react';

export const AdminCategoryesPageAsync = lazy<FC>(
    async () => await import('./AdminCategoryesPage'),
);
