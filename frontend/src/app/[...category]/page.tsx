/** @format */

import { CategoryPageProps } from '@/types/type';
import { getPicturesByCategory } from '@/api/getPicturesByCategory';
import { getCategories } from '@/api/getCategories';
import { getAllPictures } from '@/api/getAllPictures';
import { getPictureById } from '@/api/getPictureById';
import { PicturesGrid } from '@/components/PicturesGrid';
import { PictureModal } from '@/components/PictureModal';
import { ReactNode } from 'react';

export async function generateStaticParams() {
	const category = await getCategories();
	const pictures = await getAllPictures();
	const catRes = category.map((cat) => ({ category: [cat.link] }));
	const picRes = pictures.map((pic) => ({ category: [pic.category.link, pic.id.toString()] }));
	return [...catRes, ...picRes];
}

export default async function CategoryPage(props: CategoryPageProps) {
	const data = await getPicturesByCategory(props.params.category[0]);
	let picComp: ReactNode = undefined;
	if (props.params.category.length > 1) {
		let pictureid = Number.parseInt(props.params.category[1]);
		if (pictureid) {
			const picData = await getPictureById(pictureid);
			console.log(1);
			if (picData) picComp = <PictureModal picture={picData} reopenFlg={new Date()} />;
		}
	}
	console.log(props.params.category);
	return (
		<>
			<PicturesGrid data={data} />
			{picComp}
		</>
	);
}
