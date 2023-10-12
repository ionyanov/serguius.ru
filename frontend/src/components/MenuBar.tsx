import { FC } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { getCategories } from '@/api/getCategories';
import { MenuBarItem } from './MenuItem';

export const MenuBar: FC = async () => {
	const category = await getCategories();

	return (
		<Grid container component={'nav'} justifyContent={'space-between'} width={'100%'}>
			<Button href={'/'} sx={{ marginLeft: '5vw' }}>
				<Typography variant="h2">artist Sergey Agasaryan-Kirsanov</Typography>
			</Button>
			<Grid item display={'flex'} paddingRight={'2vw'}>
				{category
					.filter((cat) => cat.parCategoryId == undefined)
					.map((cat) => {
						return <MenuBarItem items={category} key={cat.id} depthLevel={0} curItem={cat} />;
					})}
			</Grid>
		</Grid>
	);
};
