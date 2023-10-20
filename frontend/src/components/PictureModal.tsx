/** @format */

'use client';
import { useEffect, useState } from 'react';
import { Modal } from '@mui/material';
import { IPicture } from '@/types/type';
import { PictureCard } from './PictureCard';

interface PictureModalProps {
	picture: IPicture;
	open: boolean;
	onClose: () => void;
}

export function PictureModal(props: PictureModalProps) {
	return (
		<Modal open={props.open} onClose={() => props.onClose()}>
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
