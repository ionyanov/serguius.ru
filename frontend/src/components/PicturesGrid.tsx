/** @format */
'use client';
import { PictureLink } from './PictureLink';
import { Masonry } from '@mui/lab';
import { IPicture } from '@/types/type';
import { PictureModal } from './PictureModal';
import { useState } from 'react';

interface PicturesGridProps {
	data: IPicture[];
	curenrPic?: IPicture;
}

export function PicturesGrid({ data, curenrPic }: PicturesGridProps) {
	const [open, setOpen] = useState(true);

	return (
		<>
			<Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }} sx={{ alignContent: 'center', margin: 0 }}>
				{data.map((pic) => (
					<PictureLink
						key={pic.id}
						id={pic.id}
						category={pic.category.link}
						imgSrc={pic.link}
						show={curenrPic?.id == pic.id ? () => setOpen(true) : undefined}
						title={pic.name}
						subtitle={[pic.material, pic.date, pic.size].filter((item) => item).join('. ')}
					/>
				))}
			</Masonry>
			{curenrPic && <PictureModal picture={curenrPic} open={open} onClose={() => setOpen(false)} />}
		</>
	);
}
