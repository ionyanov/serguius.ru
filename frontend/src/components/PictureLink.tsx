/** @format */

import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IPicture } from '@/types/type';
import { IconButton, ImageListItem, ImageListItemBar } from '@mui/material';

interface PictureLinkProps {
	id: number;
	link: string;
	title?: string;
	subtitle?: string;
	width?: number;
	height?: number;
}

export const PictureLink: FC<PictureLinkProps> = ({ id, link, title, subtitle, height = 400 }) => {
	//<Image alt={picture.name} src={`${picture.link}`} width={width} height={height} />
	return (
		<Link key={id} href={`/?photoId=${id}`} as={`/p/${id}`} shallow>
			<ImageListItem>
				<img
					srcSet={`/images/preview/${link}?w=248&fit=crop&auto=format&dpr=2 2x`}
					src={`/images/preview/${link}?w=248&fit=crop&auto=format`}
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
