/** @format */
'use client';
import { PictureLink } from './PictureLink';
import { Masonry } from '@mui/lab';
import { IPicture } from '@/types/type';

interface PicturesGridProps {
	data: IPicture[];
	width?: number;
	height?: number;
}

export async function PicturesGrid({ data, width, height }: PicturesGridProps) {
	return (
		<Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }} spacing={{ xs: 1, sm: 2 }}>
			{data.map((pic) => (
				<PictureLink
					key={pic.id}
					id={pic.id}
					link={pic.link}
					title={pic.name}
					subtitle={(pic.date ? `(${pic.date})` : '') + (pic.material ? `(${pic.material})` : '')}
					width={width}
					height={height}
				/>
			))}
		</Masonry>
	);
}
