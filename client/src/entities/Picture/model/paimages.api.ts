import { rtkAPI } from '@/shared/api/rtkAPI';
import { IProductImages } from './paimages.type';

const tag = 'ProductImages';
const imagesApi = rtkAPI.enhanceEndpoints({ addTagTypes: [tag] }).injectEndpoints({
    endpoints: (build) => ({
        uploadPicture: build.mutation<any, { category: string, data: FormData }>({
            query: ({ category, data }) => ({
                url: `/picture/upload/${category}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [tag]
        }),
        getPictures: build.query<IProductImages[], string>({
            query: (category) => ({
                url: `/picture/${category}`,
                method: 'GET',
            }),
            providesTags: [tag]
        }),
        setPicture: build.mutation<undefined, IProductImages>({
            query: (data) => ({
                url: `/picture`,
                method: 'POST',
                body: data
            }),
        }),
        delPicture: build.mutation<undefined, number>({
            query: (picId) => ({
                url: `/picture/${picId}`,
                method: 'DELETE'
            }),
            invalidatesTags: [tag]
        }),
    }),
});

export const { useUploadPictureMutation,
    useGetPicturesQuery,
    useSetPictureMutation,
    useDelPictureMutation } = imagesApi;