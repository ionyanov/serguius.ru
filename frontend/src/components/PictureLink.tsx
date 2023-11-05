/** @format */

import Link from 'next/link';
import { Button, ImageListItem, ImageListItemBar } from '@mui/material';

interface PictureLinkProps {
	imgSrc: string;
	category: string;
	id?: number;
	show?: () => void;
	title?: string;
	subtitle?: string;
}

export function PictureLink({ imgSrc, category, id, show, title, subtitle }: PictureLinkProps) {
	const img = (
		<ImageListItem>
			<img
				srcSet={`/images/preview/${imgSrc}`}
				src={`/images/preview/${imgSrc}`}
				alt={title}
				style={{ maxHeight: 400, maxWidth: '80vw' }}
				width={'auto'}
				loading="lazy"
			/>
			<ImageListItemBar title={title} subtitle={subtitle} />
		</ImageListItem>
	);

	if (show)
		return (
			<Button onClick={show} variant="text" sx={{ padding: 0, border: '5px solid black' }}>
				{img}
			</Button>
		);
	return <Link href={`/${category}/${id ? id : ''}`}>{img}</Link>;
}
