/** @format */

import { FC } from 'react';
import Link from 'next/link';
import { ImageListItem, ImageListItemBar } from '@mui/material';

interface PictureLinkProps {
	imgSrc: string;
	category: string;
	id?: number;
	title?: string;
	subtitle?: string;
	width?: number;
	height?: number;
}

export const PictureLink: FC<PictureLinkProps> = ({ id, imgSrc, category, title, subtitle, height = 400 }) => {
	return (
		<Link href={`/${category}/${id ? id : ''}`} as={`/${category}/${id ? id : ''}`} replace={true}>
			<ImageListItem>
				<img
					srcSet={`/images/preview/${imgSrc}`}
					src={`/images/preview/${imgSrc}`}
					alt={title}
					style={{ maxHeight: height }}
					width={'auto'}
					loading="lazy"
				/>
				<ImageListItemBar title={title} subtitle={subtitle} />
			</ImageListItem>
		</Link>
	);
};
