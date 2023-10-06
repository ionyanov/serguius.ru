import { FC, useCallback, useEffect, useState } from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { Settings } from '@/shared/types/enums';
import {
    useDeleteSettingsMutation,
    useInitSettingsQuery,
    useUpsertSettingsMutation,
} from '../model/settings.api';
import { SettingsEditRow } from './SettingsEditRow';
import { TablePage } from '@/shared/ui';

export const SettingEditTable: FC = () => {
    const { data, ...props } = useInitSettingsQuery();
    const [upsertSettings, upsertSettingsProps] = useUpsertSettingsMutation();
    const [deleteSettings, deleteSettingsProps] = useDeleteSettingsMutation();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setIsLoading(
            props.isLoading ||
                upsertSettingsProps.isLoading ||
                deleteSettingsProps.isLoading,
        );
        setError(
            JSON.stringify([
                props.error,
                upsertSettingsProps.error,
                deleteSettingsProps.error,
            ]),
        );
    }, [props, upsertSettingsProps, deleteSettingsProps]);

    const onSave = useCallback((name: string, value: string) => {
        upsertSettings({ name, value });
    }, []);

    const onDelete = useCallback((name: string) => {
        deleteSettings(name);
    }, []);

    return (
        <TablePage error={error} title="Settings administration">
            <TableContainer component={Paper} aria-readonly={isLoading}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell width={'75%'}>Value</TableCell>
                            <TableCell>Save</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.values(Settings).map((key, index) => (
                            <SettingsEditRow
                                name={key}
                                value={data?.[key] ?? ''}
                                key={key}
                                onSave={onSave}
                                onDelete={onDelete}
                                readonly={isLoading}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </TablePage>
    );
};
