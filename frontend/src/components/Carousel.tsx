/** @format */

'use client';
import { ReactNode, useState } from 'react';
import { Box, FormControlLabel, Paper, Radio, RadioGroup } from '@mui/material';
import { IPicture } from '@/types/type';
import { PictureLink } from './PictureLink';

interface CarouselProps {
	data: IPicture[];
}
export function Carousel(props: CarouselProps) {
	const [selectedValue, setSelectedValue] = useState(props.data[0].id);
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedValue(+event.target.value);
	};
	let rrr: ReactNode;
	for (let i = 0; i < props.data.length; i++) {
		let item = props.data[i];
		console.log(item);
		rrr = (
			<>
				{rrr}
				<FormControlLabel key={item.id} value={item.id} control={<Radio />} label={item.id} />
			</>
		);
	}

	return (
		<Paper sx={{ width: '100%' }}>
			<Box sx={{ borderTop: 1, borderColor: 'divider' }}>
				<RadioGroup row value={selectedValue} onChange={handleChange}>
					{rrr}
				</RadioGroup>
			</Box>
		</Paper>
	);
}
