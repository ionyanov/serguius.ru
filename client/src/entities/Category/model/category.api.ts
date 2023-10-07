import { rtkAPI } from '@/shared/api/rtkAPI';
import type { CategoryType } from './category.type';
const tag = 'Categoryes';
const categoryApi = rtkAPI.enhanceEndpoints({ addTagTypes: [tag] }).injectEndpoints({
	endpoints: (build) => ({
		getCategories: build.query<CategoryType[], void>({
			query: () => ({
				url: '/category',
				method: 'GET',
			}),
			providesTags: [tag]
		}),
		setCategory: build.mutation<CategoryType, CategoryType>({
			query: (category) => ({
				url: '/category',
				method: 'POST',
				body: category
			}),
			invalidatesTags: [tag]
		}),
		delCategory: build.mutation<undefined, number>({
			query: (id) => ({
				url: `/category/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: [tag]
		}),
		moveUp: build.mutation<undefined, number>({
			query: (id) => ({
				url: `/category/${id}/up`,
				method: 'POST'
			}),
			invalidatesTags: [tag]
		}),
		moveDown: build.mutation<undefined, number>({
			query: (id) => ({
				url: `/category/${id}/down`,
				method: 'POST'
			}),
			invalidatesTags: [tag]
		}),
	}),
});


export const { useGetCategoriesQuery,
	useDelCategoryMutation,
	useSetCategoryMutation,
	useMoveUpMutation,
	useMoveDownMutation } = categoryApi;
