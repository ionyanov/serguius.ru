/** @format */

'use client';
import { useEffect, useState } from 'react';
import { Modal } from '@mui/material';
import { IPicture } from '@/types/type';
import { PictureCard } from './PictureCard';

export function PictureModal(props: { picture: IPicture; reopenFlg?: Date }) {
	const [open, setOpen] = useState(true);

	useEffect(() => {
		() => setOpen(true);
	}, [props.reopenFlg]);

	return (
		<Modal open={open} onClose={() => setOpen(false)}>
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%,-50%)',
				}}>
				<PictureCard picture={props.picture} />
			</div>
		</Modal>
	);
}
