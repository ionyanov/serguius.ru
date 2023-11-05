/** @format */
'use client';
import { PictureLink } from './PictureLink';
import { IPicture } from '@/types/type';
import { PictureModal } from './PictureModal';
import { useState } from 'react';
import { Grid } from '@mui/material';

interface PicturesGridProps {
	data: IPicture[];
	curenrPic?: IPicture;
}

export function PicturesGrid({ data, curenrPic }: PicturesGridProps) {
	const [open, setOpen] = useState(true);

	return (
		<>
			<Grid container gap={2} margin={'auto'} justifyContent={'center'}>
				{data.map((pic) => (
					<Grid item>
						<PictureLink
							key={pic.id}
							id={pic.id}
							category={pic.category.link}
							imgSrc={pic.link}
							show={curenrPic?.id == pic.id ? () => setOpen(true) : undefined}
							title={pic.name}
							subtitle={[pic.material, pic.date, pic.size].filter((item) => item).join('. ')}
						/>
					</Grid>
				))}
			</Grid>
			{curenrPic && <PictureModal picture={curenrPic} open={open} onClose={() => setOpen(false)} />}
		</>
	);
}
