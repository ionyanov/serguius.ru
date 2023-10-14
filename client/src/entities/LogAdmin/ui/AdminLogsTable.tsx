import { FC, useEffect, useState } from 'react';
import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@mui/material';
import { useGetLogsQuery, useRunDeployMutation } from '../model/logs.api';
import { TablePage } from '@/shared/ui';
import { formatDate } from '@/shared/lib/formatDate';

export const AdminLogsTable: FC = () => {
    const { data = [], ...props } = useGetLogsQuery(30, {
        pollingInterval: 5000,
    });
    const [deploy, ...deployProps] = useRunDeployMutation();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(props.isLoading);
    }, [props]);

    return (
        <TablePage refresh={deploy} refreshTitle="Deploy" title="Logs">
            <TableContainer component={Paper} aria-readonly={isLoading}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Created</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell width={'80%'}>Message</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    {formatDate(item.created.toString())}
                                </TableCell>
                                <TableCell>{item.type}</TableCell>
                                <TableCell sx={{ textAlign: 'left' }}>
                                    {item.message}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </TablePage>
    );
};
