import { FC } from 'react';
import { Box, CircularProgress } from '@mui/material';

export const Loader: FC = () => {
    return (
        <Box justifyContent={'center'} display={'flex'} width={'100%'}>
            <CircularProgress />
        </Box>
    );
};
