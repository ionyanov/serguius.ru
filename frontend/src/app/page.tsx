/** @format */

import { MenuBar } from '@/components/MenuBar';
import { PicturesLine } from '@/components/PicturesLine';
import { Stack } from '@mui/material';

export default function MainPage() {
	return (
		<Stack direction={'column'} width={'100%'} spacing={2} alignItems={'center'}>
			<MenuBar />
			<img src={'images/main.jpg'} alt={'Main'} width={'100%'} height={'auto'} />
			<PicturesLine />
		</Stack>
	);
}
