/** @format */

import { FC } from 'react';
import Image from 'next/image';
import { Stack, Typography } from '@mui/material';
import { IPicture } from '@/types/type';

interface PictureCardProps {
	picture: IPicture;
}

export const PictureCard: FC<PictureCardProps> = (props) => {
	return (
		<Stack direction={'column'} alignItems={'center'}>
			<Typography variant="h2">{props.picture.name}</Typography>
			<img
				srcSet={`/images/public/${props.picture.link}?w=248&fit=crop&auto=format&dpr=2 2x`}
				src={`/images/public/${props.picture.link}?w=248&fit=crop&auto=format`}
				alt={props.picture.name}
				style={{ maxHeight: '100vh', maxWidth: '100%' }}
				width={'auto'}
				loading="lazy"
			/>
			<Typography variant="h3">
				{props.picture.date ? `(${props.picture.date})` : ''}
				{props.picture.material}
			</Typography>
		</Stack>
	);
};
