import { type FC, memo } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { getRouteMain } from '@/shared/const/router';

interface PageErrorProps {}

export const PageError: FC<PageErrorProps> = memo((props: PageErrorProps) => {
    const reloadPage: () => void = () => {
        location.reload();
    };

    return (
        <Stack
            height={'100vh'}
            spacing={2}
            alignContent={'center'}
            justifyContent={'center'}>
            <Typography align={'center'} variant={'h1'}>
                Sorry, we have a problem :(
            </Typography>
            <Stack direction={'row'} justifyContent={'space-around'}>
                <Button onClick={reloadPage} variant="contained">
                    {'Reload'}
                </Button>
                <Button href={getRouteMain()} variant="contained">
                    {'Go to main page'}
                </Button>
            </Stack>
        </Stack>
    );
});
