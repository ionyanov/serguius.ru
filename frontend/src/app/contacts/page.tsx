/** @format */

import { Settings, getSettings } from '@/api/getSettings';
import { Grid } from '@mui/material';

export default async function AboutPage() {
	const email = await getSettings(Settings.EMAIL);
	const phone = await getSettings(Settings.PHONE);

	return (
		<Grid container spacing={2} margin={'auto'} width={'90vw'}>
			<Grid item xs={6} md={3}>
				<img src="/images/about_main1.jpg" width={'100%'} />
			</Grid>
			<Grid item xs={6} md={3}>
				<img src="/images/about_main2.jpg" width={'100%'} />
			</Grid>
			<Grid item xs={6} md={3}>
				<img src="/images/about_main3.jpg" width={'100%'} />
			</Grid>
			<Grid item xs={6} md={3}>
				<img src="/images/about_main4.jpg" width={'100%'} />
			</Grid>
			<Grid item xs={12} md={6} textAlign={'center'}>
				Email: {email}
			</Grid>
			<Grid item xs={12} md={6} textAlign={'center'}>
				Phone: {phone}
			</Grid>
			<Grid item xs={12}>
				Sergey Agasaryen, born in 1961, graduated from the Art Institute in Baku in 1984. Since 1990 he lives
				and works in Moscow. Since 1994 - member if International Federation of Arts. 1998-2004 - "Krasnaya"
				Galery, Jacsonwill USA. <br />
				Exhibitions sinse 1988. <br />
				Printing, grathiks, photo, murals, carving, restoration and other.
			</Grid>
		</Grid>
	);
}
