import { FC, useCallback, useState } from 'react';
import { Button, Stack, TextField } from '@mui/material';
import {
    useDelPictureMutation,
    useSetPictureMutation,
} from '../model/paimages.api';
import { Delete, Save } from '@mui/icons-material';
import { IProductImages } from '../model/paimages.type';
import { getImagePath } from '@/shared/const/router';

interface PictureCardProps {
    img: IProductImages;
}

export const PictureCard: FC<PictureCardProps> = ({ img }) => {
    const [name, setName] = useState(img.name);
    const [date, setDate] = useState(img.date);
    const [material, setMaterial] = useState(img.material);

    const [onDelete] = useDelPictureMutation();
    const [onUpdate] = useSetPictureMutation();

    const saveData = useCallback(() => {
        onUpdate({
            id: img.id,
            name: name,
            date: date,
            material: material,
        });
    }, [img, name, date, material]);

    return (
        <Stack
            gap={1}
            spacing={1}
            alignItems={'center'}
            justifyContent={'center'}>
            <img
                src={getImagePath(img.link)}
                alt={img.name}
                style={{
                    width: '300px',
                    margin: '5px',
                }}
                height={'100%'}
            />
            <TextField
                placeholder="Название"
                multiline
                minRows={2}
                fullWidth
                defaultValue={img.name}
                onChange={(event) => setName(event.target.value)}
            />
            <TextField
                placeholder="Дата изготовления"
                multiline
                fullWidth
                defaultValue={img.date}
                onChange={(event) => setDate(event.target.value)}
            />
            <TextField
                placeholder="Материал"
                multiline
                fullWidth
                defaultValue={img.material}
                onChange={(event) => setMaterial(event.target.value)}
            />
            <Stack flexDirection={'row'} alignItems={'center'}>
                <Button variant="text" onClick={saveData}>
                    <Save />
                </Button>
                <Button variant="text" onClick={() => onDelete(img.id)}>
                    <Delete />
                </Button>
            </Stack>
        </Stack>
    );
};
