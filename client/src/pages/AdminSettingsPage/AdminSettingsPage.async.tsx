import { type FC, lazy } from 'react';

export const AdminSettingsPageAsync = lazy<FC>(
    async () => await import('./AdminSettingsPage'),
);
