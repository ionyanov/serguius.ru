import { CategorySelector } from '@/entities/Category';
import { PicturesGrid } from '@/entities/Picture';
import { Stack } from '@mui/material';
import { FC, useState } from 'react';

export const PicturesTable: FC = () => {
    const [currentCategory, setCurrentCategory] = useState<string>('');
    return (
        <Stack direction={'row'} width={'100%'}>
            <CategorySelector onSelect={setCurrentCategory} />
            {currentCategory && <PicturesGrid category={currentCategory} />}
        </Stack>
    );
};
