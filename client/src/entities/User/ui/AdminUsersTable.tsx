import { FC, useCallback, useEffect, useState } from 'react';
import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@mui/material';
import {
    useGetAllUsersDataQuery,
    useUpdateUserDataMutation,
} from '../model/useradmin.api';
import { AdminUserRow } from './AdminUserRow';
import { IAdminUser } from '../model/user.types';
import { TablePage } from '@/shared/ui';

export const AdminUsersTable: FC = () => {
    const { data = [], ...props } = useGetAllUsersDataQuery();
    const [updateUserData, updateUserDataProps] = useUpdateUserDataMutation();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setIsLoading(props.isLoading || updateUserDataProps.isLoading);
        setError(
            updateUserDataProps.error
                ? JSON.stringify(
                      'data' in updateUserDataProps.error!
                          ? updateUserDataProps.error.data
                          : updateUserDataProps.error,
                  )
                : '',
        );
    }, [props, updateUserDataProps]);

    const onSave = useCallback((item: IAdminUser) => {
        updateUserData(item);
    }, []);

    return (
        <TablePage
            error={error}
            refresh={props.refetch}
            title="Users administration">
            <TableContainer component={Paper} aria-readonly={isLoading}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell width={'30%'}>Email</TableCell>
                            <TableCell>Created</TableCell>
                            <TableCell>Last Login</TableCell>
                            <TableCell>Last updated</TableCell>
                            <TableCell width={'10%'}>Lock Count</TableCell>
                            <TableCell>Lock</TableCell>
                            <TableCell>Save</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((item) => (
                            <AdminUserRow
                                item={item}
                                key={item.id}
                                onSave={onSave}
                                readonly={isLoading}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </TablePage>
    );
};
