/** @format */

import { IconButton, ImageList, ImageListItem, ImageListItemBar, ListSubheader, Stack } from '@mui/material';
import { getRandomPictures } from '@/api/getRandomPictures';
import { PictureLink } from './PictureLink';

export async function PicturesLine() {
	const data = await getRandomPictures();
	return (
		<Stack margin={10} width={'95vw'}>
			<ImageList
				rowHeight={400}
				sx={{ overflowY: 'hidden' }}
				variant="standard"
				cols={Number.parseInt(process.env._RANDOM_IMAGE_COUNT_ ?? '3')}>
				{data.map((pic) => (
					<PictureLink
						key={pic.id}
						id={pic.id}
						link={pic.link}
						title={pic.category.name}
						subtitle={(pic.date ? `(${pic.date})` : '') + (pic.material ? `(${pic.material})` : '')}
					/>
				))}
			</ImageList>
		</Stack>
	);
}
