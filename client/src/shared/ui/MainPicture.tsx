import * as React from 'react';
import { FC } from 'react';
import Box from '@mui/material/Box';

interface MainPictureProps {}

export const MainPicture: FC<MainPictureProps> = (props) => {
    return (
        <Box
            sx={{
                width: '100%',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                backgroundImage: "url('/images/fone_logo.png')",
                backgroundPosition: 'top',
                backgroundRepeat: 'repeat-x',
                backgroundOrigin: 'content-box',
                backgroundSize: 'contain',
            }}
            zIndex={-10}>
            <img
                src={'/images/maintitle.png'}
                style={{ width: '75%', minHeight: '50px', minWidth: '200px' }}
            />
        </Box>
    );
};
