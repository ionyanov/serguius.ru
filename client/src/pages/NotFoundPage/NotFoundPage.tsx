import { type FC } from 'react';
import { Page } from '@/widgets/Page';
import { Typography } from '@mui/material';

interface NotFoundPageProps {
}

export const NotFoundPage: FC<NotFoundPageProps> = (props) => {
    return (
        <Page>
            <Typography align={'center'} variant={'h4'} color={'error'}>
                Page not found
            </Typography>
        </Page>
    );
};
