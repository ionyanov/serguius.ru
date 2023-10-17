/** @format */

import { Stack, Typography } from '@mui/material';
import { getPicturesByCategory } from '@/api/getPicturesByCategory';
import { getCategories } from '@/api/getCategories';
import { PicturesGrid } from '@/components/PicturesGrid';
import { CategoryPageProps } from '@/types/type';
//import { useRouter } from 'next/router';
//import { useEffect } from 'react';
//import { useLastViewedPhoto } from '@/provider/utils/useLastViewedPhoto';
//import getBase64ImageUrl from '../utils/generateBlurPlaceholder';
//import type { ImageProps } from '../utils/types';

export async function generateStaticParams() {
	const category = await getCategories();

	return category.map((cat) => ({
		category: cat.link,
	}));
}

export default async function CategoryPage(props: CategoryPageProps) {
	//const router = useRouter();
	//const { photoId } = router.query;
	//const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();
	//const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

	/*useEffect(() => {
		// This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
		if (lastViewedPhoto && !photoId) {
			//lastViewedPhotoRef.current?.scrollIntoView({ block: 'center' });
			setLastViewedPhoto(null);
		}
	}, [photoId, lastViewedPhoto, setLastViewedPhoto]);*/
	const data = await getPicturesByCategory(props.params.category);

	/*photoId && (
				<Modal
					images={images}
					onClose={() => {
						setLastViewedPhoto(photoId);
					}}
				/>
				)*/
	return <PicturesGrid data={data} />;
}
