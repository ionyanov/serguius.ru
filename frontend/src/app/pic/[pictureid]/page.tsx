/** @format */

import { getAllPictures } from '@/api/getAllPictures';
import { getPictureById } from '@/api/getPictureById';
import { MenuBar } from '@/components/MenuBar';
import { PictureCard } from '@/components/PictureCard';

export async function generateStaticParams() {
	const pictures = await getAllPictures();
	return pictures.map((pic) => ({ pictureid: pic.id.toString() }));
}

export default async function PictureModal(props: { params: { pictureid: string } }) {
	const data = await getPictureById(+props.params.pictureid);
	if (!data) return <></>;
	return (
		<div>
			<MenuBar />
			<div>
				<PictureCard picture={data} />
			</div>
		</div>
	);
}
