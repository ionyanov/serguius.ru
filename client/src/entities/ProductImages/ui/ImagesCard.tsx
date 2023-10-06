import { FC, useCallback, useState } from 'react';
import { ImageList, ImageListItem, Stack, Typography } from '@mui/material';
import { useGetImagesQuery } from '../model/paimages.api';
import { Loader } from '@/shared/ui/Loader';
import { getImagePath } from '@/shared/const/router';
import { IProductImages } from '../model/paimages.type';
import { getSettings } from '@/entities/Settings';
import { Settings } from '@/shared/types/enums';

interface ImagesCardProps {
    prodId: number;
    main?: IProductImages;
}

export const ImagesCard: FC<ImagesCardProps> = (args) => {
    const { data, ...dataProp } = useGetImagesQuery(args.prodId);
    const [id, setId] = useState(args.main?.id);
    const [description, setDescription] = useState(args.main?.description);
    const [imageLink, setImageLink] = useState(args.main?.link);

    const onSelect = (item: IProductImages) => {
        setId(item.id);
        setDescription(item.description);
        setImageLink(item.link);
    };

    const onGetNext = useCallback(() => {
        if (data) {
            let index = data.findIndex((item) => item.id == id);
            if (Number.isInteger(index)) {
                index = index == data.length - 1 ? 0 : index + 1;
                onSelect(data[index]);
            }
        }
    }, [data, id]);

    if (dataProp.isLoading || !data) return <Loader />;
    return (
        <Stack direction={'column'} spacing={2} alignItems={'center'}>
            <img
                src={getImagePath(imageLink)}
                style={{
                    height: 'fit-content',
                    width: 'fit-content',
                    maxWidth: '100%',
                    maxHeight: '50vh',
                }}
                onClick={onGetNext}
            />
            <Typography variant="h4">{description}</Typography>
            <ImageList variant="masonry" cols={3} gap={8}>
                {data.map((item, index) => (
                    <ImageListItem key={item.id} onClick={() => onSelect(item)}>
                        <img
                            src={getImagePath(item.link)}
                            onClick={onGetNext}
                            style={{ height: '15vh' }}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Stack>
    );
};
