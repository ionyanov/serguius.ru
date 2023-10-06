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
		upsertCategory: build.mutation<CategoryType, CategoryType>({
			query: (category) => ({
				url: '/category',
				method: 'POST',
				body: category
			}),
			invalidatesTags: [tag]
		}),
		deleteCategory: build.mutation<undefined, number>({
			query: (id) => ({
				url: `/category/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: [tag]
		}),
		addProperty: build.mutation<undefined, { catId: number, propId: number }>({
			query: ({ catId, propId }) => ({
				url: `/category/${catId}/${propId}`,
				method: 'POST'
			}),
			invalidatesTags: [tag]
		}),
		deleteProperty: build.mutation<undefined, { catId: number, propId: number }>({
			query: ({ catId, propId }) => ({
				url: `/category/${catId}/${propId}`,
				method: 'DELETE'
			}),
			invalidatesTags: [tag]
		})
	}),
});


export const { useGetCategoriesQuery,
	useDeleteCategoryMutation,
	useUpsertCategoryMutation,
	useAddPropertyMutation,
	useDeletePropertyMutation } = categoryApi;
