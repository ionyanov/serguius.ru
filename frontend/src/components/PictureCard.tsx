/** @format */

import { FC } from 'react';
import Image from 'next/image';
import { Grid, Paper, Stack, Typography } from '@mui/material';
import { IPicture } from '@/types/type';

interface PictureCardProps {
	picture: IPicture;
}

export const PictureCard: FC<PictureCardProps> = (props) => {
	return (
		<Stack direction={'column'} alignItems={'center'} spacing={1}>
			<img
				srcSet={`/images/public/${props.picture.link}`}
				src={`/images/public/${props.picture.link}`}
				alt={props.picture.name}
				style={{ maxHeight: '80vh', maxWidth: '95vw' }}
				width={'auto'}
				loading="lazy"
			/>
			<Paper style={{ width: '100%' }}>
				<Typography variant="h6">
					{props.picture.name}
					<br />
					{[props.picture.material, props.picture.date, props.picture.size].filter((item) => item).join('. ')}
				</Typography>
			</Paper>
		</Stack>
	);
};
