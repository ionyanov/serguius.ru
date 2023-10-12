/** @format */

import { PicturesLine } from '@/components/PicturesLine';
import { Container, Stack } from '@mui/material';

export default function MainPage() {
	return (
		<Stack direction={'column'} width={'100vw'} spacing={5} alignItems={'center'}>
			<img src={'images/main.jpg'} alt={'Main'} width={'100%'} height={'auto'} />
			<PicturesLine />
		</Stack>
	);
}
