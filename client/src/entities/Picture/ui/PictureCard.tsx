import { FC, useCallback, useState } from 'react';
import { Button, Stack, TextField } from '@mui/material';
import {
    useDelPictureMutation,
    useSetPictureMutation,
} from '../model/paimages.api';
import { Delete, Save } from '@mui/icons-material';
import { IPicture } from '../model/paimages.type';
import { getImagePath } from '@/shared/const/router';

interface PictureCardProps {
    img: IPicture;
}

export const PictureCard: FC<PictureCardProps> = ({ img }) => {
    const [name, setName] = useState(img.name);
    const [date, setDate] = useState(img.date);
    const [material, setMaterial] = useState(img.material);
    const [size, setSize] = useState(img.size);

    const [onDelete] = useDelPictureMutation();
    const [onUpdate] = useSetPictureMutation();

    const saveData = useCallback(() => {
        onUpdate({
            id: img.id,
            name: name,
            date: date,
            material: material,
            size: size,
        });
    }, [img, name, date, material, size]);

    return (
        <Stack gap={1} spacing={1} alignItems={'center'} justifyContent={'end'}>
            <img
                src={getImagePath(img.link)}
                alt={img.name}
                style={{
                    width: '350px',
                    margin: '5px',
                }}
                height={'auto'}
            />
            <TextField
                placeholder="Название"
                multiline
                minRows={2}
                fullWidth
                defaultValue={img.name}
                onChange={(event) => setName(event.target.value)}
            />
            <Stack direction={'row'}>
                <TextField
                    placeholder="Дата изготовления"
                    multiline
                    fullWidth
                    defaultValue={img.date}
                    onChange={(event) => setDate(event.target.value)}
                />
                <TextField
                    placeholder="Размер"
                    multiline
                    fullWidth
                    defaultValue={img.size}
                    onChange={(event) => setSize(event.target.value)}
                />
            </Stack>
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
