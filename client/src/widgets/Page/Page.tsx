import { Container } from '@mui/material';
import { FC, ReactNode } from 'react';

interface PageProps {
    children: ReactNode;
}

export const Page: FC<PageProps> = (props) => {
    return <Container maxWidth="xl">{props.children}</Container>;
};
