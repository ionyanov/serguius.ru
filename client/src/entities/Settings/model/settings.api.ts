import { Settings } from '@/shared/types/enums';
import { rtkAPI } from '@/shared/api/rtkAPI';

const tag = 'Settings';
const settingsApi = rtkAPI.enhanceEndpoints({ addTagTypes: [tag] }).injectEndpoints({
	endpoints: (build) => ({
		initSettings: build.query<Record<Settings, string>, void>({
			query: () => ({
				url: '/settings',
				method: 'GET',
			}),
			providesTags: [tag]
		}),
		upsertSettings: build.mutation<undefined, { name: string, value: string }>({
			query: (setting) => ({
				url: '/settings',
				method: 'POST',
				body: setting
			}),
			invalidatesTags: [tag]
		}),
		deleteSettings: build.mutation<undefined, string>({
			query: (name) => ({
				url: `/settings/${name}`,
				method: 'DELETE'
			}),
			invalidatesTags: [tag]
		})
	}),
});


export const { useInitSettingsQuery, useUpsertSettingsMutation, useDeleteSettingsMutation } = settingsApi;
