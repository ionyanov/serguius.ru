import { FC, ReactNode } from 'react';
import { Button, Grid, Paper, Stack, Typography } from '@mui/material';

class TablePageProps {
    error?: string;
    title?: string;
    children?: ReactNode;
    refresh?: () => void;
}

export const TablePage: FC<TablePageProps> = (props) => {
    return (
        <Stack
            direction={'column'}
            gap={'10px'}
            component={Paper}
            width={'100%'}>
            <Stack
                direction={'row'}
                alignItems={'stretch'}
                justifyContent={'flex-start'}>
                {props.refresh && (
                    <Button
                        size="small"
                        onClick={props.refresh}
                        variant="outlined">
                        Refresh
                    </Button>
                )}
                <Grid container direction={'column'}>
                    {props.title && (
                        <Typography width={'100%'} variant="h2" align="center">
                            {props.title}
                        </Typography>
                    )}
                    <Typography
                        width={'100%'}
                        sx={{ color: 'red' }}
                        variant="h4"
                        align="center">
                        {props.error}
                    </Typography>
                </Grid>
            </Stack>
            {props.children}
        </Stack>
    );
};
