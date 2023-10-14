import { type FC, lazy } from 'react';

export const AdminLogsPageAsync = lazy<FC>(
    async () => await import('./AdminLogsPage'),
);
