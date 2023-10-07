import { FC, useCallback, useEffect, useState, ChangeEvent } from 'react';
import {
    Button,
    TextField,
    TableCell,
    TableRow,
    Checkbox,
} from '@mui/material';
import * as Icons from '@mui/icons-material';
import { CategoryType } from '../model/category.type';
import slugify from 'slugify';

interface CategoryEditRowProps {
    item: CategoryType;
    readonly: boolean;
    onSave?: (item: CategoryType) => void;
    onDelete?: (id: number) => void;
    onUp?: (id: number) => void;
    onDown?: (id: number) => void;
    onLoading?: (isLoad: boolean) => void;
}

export const CategoryEditRow: FC<CategoryEditRowProps> = (props) => {
    const [canSave, setCanSave] = useState(false);
    const [editedName, setEditedName] = useState(props.item.name);
    const [editedLink, setEditedLink] = useState(props.item.link);
    const [editedVisible, setEditedVisible] = useState(
        props.item.visible ?? true,
    );

    const nameChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setEditedName(event.target.value);
        setEditedLink(
            slugify(event.target.value, {
                replacement: '_',
                lower: true,
                strict: true,
            }),
        );
    };

    useEffect(() => {
        setEditedName(props.item.name);
        setEditedLink(props.item.link);
        setEditedVisible(props.item.visible);
    }, [props.item]);

    useEffect(() => {
        setCanSave(
            props.item.name != editedName ||
                props.item.visible != editedVisible,
        );
    }, [props.item, editedName, editedVisible]);

    const onSaveClick = useCallback(() => {
        if (props.onSave)
            props.onSave({
                id: props.item.id,
                name: editedName,
                link: editedLink,
                visible: editedVisible,
            });
    }, [props.item, editedName, editedLink, editedVisible]);

    const onDeleteClick = useCallback(() => {
        if (props.onDelete)
            if (confirm('You want delete settings?'))
                props.onDelete(props.item.id);
    }, [props.item]);

    return (
        <TableRow>
            <TableCell>
                <Button
                    onClick={() => {
                        if (props.onUp) props.onUp(props.item.id);
                    }}
                    disabled={props.readonly || props.item.id == 0}>
                    <Icons.ArrowUpward />
                </Button>
            </TableCell>
            <TableCell>
                <Button
                    onClick={() => {
                        if (props.onDown) props.onDown(props.item.id);
                    }}
                    disabled={props.readonly || props.item.id == 0}>
                    <Icons.ArrowDownward />
                </Button>
            </TableCell>
            <TableCell align="center">
                <Checkbox
                    checked={editedVisible}
                    onChange={(event) => setEditedVisible(event.target.checked)}
                    inputProps={{ 'aria-label': 'controlled' }}
                    disabled={props.readonly}
                />
            </TableCell>
            <TableCell>
                <TextField
                    error={editedName != props.item.name}
                    label={editedName == props.item.name ? '' : 'Edited'}
                    value={editedName}
                    onChange={nameChange}
                    variant={'outlined'}
                    fullWidth
                    disabled={props.readonly}
                />
            </TableCell>
            <TableCell>{editedLink}</TableCell>
            <TableCell align="center">
                <Button
                    onClick={onSaveClick}
                    disabled={props.readonly || !canSave}>
                    <Icons.Save />
                </Button>
            </TableCell>
            <TableCell align="center">
                <Button
                    onClick={onDeleteClick}
                    disabled={props.readonly || props.item.id == 0}>
                    <Icons.Delete />
                </Button>
            </TableCell>
        </TableRow>
    );
};
