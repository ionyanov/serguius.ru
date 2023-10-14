import { FC, useCallback, useEffect, useState, ChangeEvent } from 'react';
import {
    Button,
    TextField,
    TableCell,
    TableRow,
    Typography,
    Select,
    MenuItem,
} from '@mui/material';
import { Save, Delete } from '@mui/icons-material';
import { Settings } from '@/shared/types/enums';

interface SettingsEditRowProps {
    name: string;
    value: string;
    readonly: boolean;
    onSave?: (name: string, value: string) => void;
    onDelete?: (name: string) => void;
}

export const SettingsEditRow: FC<SettingsEditRowProps> = (props) => {
    const [editedValue, setEditedValue] = useState(props.value);

    useEffect(() => {
        setEditedValue(props.value);
    }, [props.value]);

    const onSaveClick = useCallback(() => {
        if (props.onSave) props.onSave(props.name, editedValue);
    }, [editedValue]);

    const onDeleteClick = useCallback(() => {
        if (props.onDelete)
            if (confirm('You want delete settings?'))
                props.onDelete(props.name);
    }, [editedValue]);

    return (
        <TableRow>
            <TableCell>
                <Typography variant="h3">{props.name}</Typography>
            </TableCell>
            <TableCell>
                <TextField
                    error={editedValue != props.value}
                    value={editedValue}
                    onChange={(e) => setEditedValue(e.target.value)}
                    variant={'outlined'}
                    fullWidth
                    disabled={props.readonly}
                />
            </TableCell>
            <TableCell align="center">
                <Button
                    onClick={onSaveClick}
                    disabled={props.readonly || editedValue == props.value}>
                    <Save />
                </Button>
            </TableCell>
            <TableCell align="center">
                <Button
                    onClick={onDeleteClick}
                    disabled={props.readonly || editedValue == props.value}>
                    <Delete />
                </Button>
            </TableCell>
        </TableRow>
    );
};
