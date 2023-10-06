import { ChangeEvent, FC, useCallback, useState } from 'react';
import { Button, Stack, TextField } from '@mui/material';
import {
    useDelImagesMutation,
    useSetImagesMutation,
    useSetMainImageMutation,
} from '../model/paimages.api';
import {
    CheckCircle,
    CheckCircleOutline,
    Delete,
    Save,
} from '@mui/icons-material';
import { IProductImages } from '../model/paimages.type';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { getImagePath } from '@/shared/const/router';

interface PAImagesRowProps {
    prodId: number;
    img: IProductImages;
}

export const PAImagesRow: FC<PAImagesRowProps> = (args) => {
    const [descr, setDescr] = useState(args.img.description);
    const [onDelete] = useDelImagesMutation();
    const [onUpdate] = useSetImagesMutation();

    const saveData = useCallback(() => {
        if (descr != '')
            onUpdate({
                prodId: args.prodId,
                data: {
                    id: args.img.id,
                    description: descr,
                },
            });
    }, [args.prodId, args.img, descr]);

    return (
        <Stack flexDirection={'row'} gap={1} spacing={1} alignItems={'center'}>
            <img
                src={getImagePath(args.img.link)}
                alt={args.img.description}
                style={{
                    width: '100px',
                    margin: '5px',
                }}
                height={'100%'}
            />
            <TextField
                multiline
                minRows={2}
                fullWidth
                defaultValue={args.img.description}
                onChange={(event) => setDescr(event.target.value)}
            />
            <Stack flexDirection={'column'} alignItems={'center'}>
                <Button variant="text" onClick={saveData}>
                    <Save />
                </Button>
                <Button
                    variant="text"
                    onClick={() =>
                        onDelete({
                            prodId: args.prodId,
                            imgId: args.img.id,
                        })
                    }>
                    <Delete />
                </Button>
            </Stack>
        </Stack>
    );
};
