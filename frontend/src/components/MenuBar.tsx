/** @format */

import { FC } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { getCategories } from '@/api/getCategories';
import { MenuBarItem } from './MenuItem';

interface MenuBarProps {
	categoryslug?: string;
	categorytitle?: string;
}

export const MenuBar: FC<MenuBarProps> = async (props) => {
	const categories = await getCategories();
	return (
		<Grid
			container
			component={'nav'}
			justifyContent={{ xs: 'center', md: 'space-between' }}
			direction={{ xs: 'column', md: 'row' }}
			alignItems={{ xs: 'center', md: 'baseline' }}
			width={'100vw'}>
			<Button href={'/'}>
				<Typography variant="h2">artist Sergey Agasaryan-Kirsanov</Typography>
			</Button>
			<Typography variant="h2">{props.categorytitle}</Typography>
			<Grid item display={'flex'}>
				{categories
					.filter((cat) => cat.parCategoryId == undefined)
					.map((cat) => {
						return <MenuBarItem items={categories} key={cat.id} depthLevel={0} curItem={cat} />;
					})}
				<MenuBarItem items={[]} depthLevel={0} curItem={{ id: -1, name: 'Contacts', link: 'contacts' }} />
			</Grid>
		</Grid>
	);
};
