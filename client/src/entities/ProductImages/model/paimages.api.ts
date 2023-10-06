import { rtkAPI } from '@/shared/api/rtkAPI';
import { IProductImages } from './paimages.type';

const tag = 'ProductImages';
const imagesApi = rtkAPI.enhanceEndpoints({ addTagTypes: [tag] }).injectEndpoints({
    endpoints: (build) => ({
        UploadImages: build.mutation<any, FileList>({
            query: (body) => ({
                url: `/images/upload`,
                method: 'POST',
                body: () => {
                    const formData = new FormData();
                    //formData.append(`files`, body);
                    return formData
                },
            }),
        }),
        getImages: build.query<IProductImages[], number>({
            query: (prodId) => ({
                url: `/images/${prodId}`,
                method: 'GET',
            }),
            providesTags: [tag]
        }),
        setImages: build.mutation<undefined, { prodId: number, data: IProductImages }>({
            query: ({ prodId, data }) => ({
                url: `/images/${prodId}`,
                method: 'POST',
                body: data
            }),
        }),
        delImages: build.mutation<undefined, { prodId: number, imgId: number }>({
            query: ({ prodId, imgId }) => ({
                url: `/images/${prodId}/${imgId}`,
                method: 'DELETE'
            }),
            invalidatesTags: [tag]
        }),
        setMainImage: build.mutation<undefined, { prodId: number, imgId: number }>({
            query: ({ prodId, imgId }) => ({
                url: `/images/${prodId}/${imgId}`,
                method: 'POST'
            }),
            invalidatesTags: [tag]
        }),
    }),
});

export const { useUploadImagesMutation,
    useGetImagesQuery,
    useSetImagesMutation,
    useDelImagesMutation,
    useSetMainImageMutation } = imagesApi;