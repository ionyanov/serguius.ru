/** @format */

import { ImageList, Stack } from '@mui/material';
import { getRandomPictures } from '@/api/getRandomPictures';
import { PictureLink } from './PictureLink';

export async function PicturesLine() {
	const data = await getRandomPictures();
	if (!data) return <></>;
	return (
		<Stack width={'95vw'} spacing={2}>
			<ImageList
				rowHeight={'auto'}
				variant="standard"
				gap={10}
				sx={{
					gridTemplateColumns: {
						xs: 'repeat(1, 1fr) !important',
						md: `repeat(${Number.parseInt(process.env._RANDOM_IMAGE_COUNT_ ?? '3')}, 1fr) !important`,
					},
				}}>
				{data.map((pic) => (
					<PictureLink
						key={pic.id}
						category={pic.category.link}
						imgSrc={pic.link}
						title={pic.category.name}
					/>
				))}
			</ImageList>
		</Stack>
	);
}
