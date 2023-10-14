import { FC, useCallback, useEffect, useState } from 'react';
import {
    Button,
    TableCell,
    TableRow,
    TextField,
    Checkbox,
} from '@mui/material';
import { Save } from '@mui/icons-material';
import { IAdminUser } from '../model/user.types';
import { formatDate } from '@/shared/lib/formatDate';

interface AdminUserRowProps {
    item: IAdminUser;
    readonly: boolean;
    onSave?: (item: IAdminUser) => void;
}

export const AdminUserRow: FC<AdminUserRowProps> = (props) => {
    const [edited, setEdited] = useState(false);
    const [editedEmail, setEditedEmail] = useState(props.item.email);
    const [editedLockFlg, setEditedLockFlg] = useState(props.item.lockflg);

    useEffect(() => {
        setEditedEmail(props.item.email);
        setEditedLockFlg(props.item.lockflg);
    }, [props.item]);

    useEffect(() => {
        setEdited(
            props.item.email != editedEmail ||
                props.item.lockflg != editedLockFlg,
        );
    }, [props.item, editedEmail, editedLockFlg]);

    const onSaveClick = useCallback(() => {
        const newUser: IAdminUser = { ...props.item };
        newUser.email = editedEmail;
        newUser.lockflg = editedLockFlg;
        if (!editedLockFlg) newUser.lockcount = 0;
        if (props.onSave) props.onSave(newUser);
    }, [props.item, editedEmail, editedLockFlg]);

    return (
        <TableRow>
            <TableCell>{props.item.id}</TableCell>
            <TableCell>
                <TextField
                    fullWidth
                    variant="outlined"
                    disabled={props.readonly}
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                />
            </TableCell>
            <TableCell>{formatDate(props.item.created)}</TableCell>
            <TableCell>{formatDate(props.item.lastlogin)} </TableCell>
            <TableCell>{formatDate(props.item.updated)}</TableCell>
            <TableCell align="center">{props.item.lockcount}</TableCell>
            <TableCell>
                <Checkbox
                    checked={editedLockFlg}
                    inputProps={{ 'aria-label': 'controlled' }}
                    onChange={(e) => setEditedLockFlg(e.target.checked)}
                    disabled={props.readonly}
                />
            </TableCell>
            <TableCell align="center">
                <Button
                    onClick={onSaveClick}
                    disabled={props.readonly || !edited}>
                    <Save />
                </Button>
            </TableCell>
        </TableRow>
    );
};
