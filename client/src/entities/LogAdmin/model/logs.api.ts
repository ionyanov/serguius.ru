import { rtkAPI } from '@/shared/api/rtkAPI';
import type { ILogs } from './logs.types';

const logsAdminApi = rtkAPI.injectEndpoints({
    endpoints: (build) => ({
        getLogs: build.query<ILogs[], number | void>({
            query: (data) => ({
                url: `/logs?${data}`,
                method: 'GET'
            })
        }),
        runDeploy: build.mutation<void, void>({
            query: () => ({
                url: `/deploy`,
                method: 'POST'
            })
        }),
    }),
});

export const { useGetLogsQuery, useRunDeployMutation } = logsAdminApi;