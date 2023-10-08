import { FC, useCallback, useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';
import { useGetPicturesQuery } from '../model/paimages.api';
import { Refresh } from '@mui/icons-material';
import { Loader } from '@/shared/ui/Loader';
import { PictureloadCard } from './PictureUploadCard';
import { PictureCard } from './PictureCard';
import { TablePage } from '@/shared/ui';

interface PicturesGridProps {
    category: string;
}

export const PicturesGrid: FC<PicturesGridProps> = (args) => {
    const { data, ...dataProps } = useGetPicturesQuery(args.category);
    const [error, setError] = useState('');

    useEffect(() => {
        setError(
            dataProps.error
                ? JSON.stringify(
                      'data' in dataProps.error
                          ? dataProps.error.data
                          : dataProps.error,
                  )
                : '',
        );
    }, [dataProps]);

    if (dataProps.isLoading) return <Loader />;
    return (
        <TablePage
            error={error}
            refresh={dataProps.refetch}
            title="Categories administration">
            <Grid container rowGap={2}>
                <PictureloadCard
                    category={args.category}
                    refresh={dataProps.refetch}
                />
                {data?.map((img) => (
                    <PictureCard img={img} key={img.id} />
                ))}
            </Grid>
        </TablePage>
    );
};
