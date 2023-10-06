import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import {
    Button,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    Stack,
} from '@mui/material';
import { PAImagesUploadCard } from './PAImagesUploadCard';
import {
    useGetImagesQuery,
    useSetMainImageMutation,
} from '../model/paimages.api';
import { Refresh } from '@mui/icons-material';
import { PAImagesRow } from './PAImagesRow';
import { Loader } from '@/shared/ui/Loader';
import { getImagePath } from '@/shared/const/router';

interface PAImagesCardProps {
    prodId: number;
}

export const PAImagesCard: FC<PAImagesCardProps> = (args) => {
    const { data, ...dataProp } = useGetImagesQuery(args.prodId);
    const [setMain] = useSetMainImageMutation();

    const onRefresh = useCallback(() => {
        dataProp.refetch();
    }, []);

    if (dataProp.isLoading) return <Loader />;
    return (
        <Stack direction={'column'} rowGap={2}>
            <Grid container justifyContent={'center'}>
                <PAImagesUploadCard id={args.prodId} refresh={onRefresh} />
                <Button variant="text" onClick={onRefresh}>
                    <Refresh />
                </Button>
            </Grid>
            {data?.map((img) => (
                <FormControlLabel
                    value={img.id}
                    key={img.id}
                    control={<Radio />}
                    label={<PAImagesRow img={img} prodId={args.prodId} />}
                />
            ))}
        </Stack>
    );
};
