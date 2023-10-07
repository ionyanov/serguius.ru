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
import { CategoryType } from '../model/category.type';
import { CategoryEditRow } from './CategoryEditRow';
import {
    useDelCategoryMutation,
    useGetCategoriesQuery,
    useMoveDownMutation,
    useMoveUpMutation,
    useSetCategoryMutation,
} from '../model/category.api';
import { TablePage } from '@/shared/ui';

export const CategoryEditTable: FC = () => {
    const { data, ...props } = useGetCategoriesQuery();
    const [setCategory, setCategoryProps] = useSetCategoryMutation();
    const [delCategory, delCategoryProps] = useDelCategoryMutation();
    const [moveUp, moveUpProps] = useMoveUpMutation();
    const [moveDown, moveDownProps] = useMoveDownMutation();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setIsLoading(
            props.isLoading ||
                setCategoryProps.isLoading ||
                delCategoryProps.isLoading ||
                moveUpProps.isLoading ||
                moveDownProps.isLoading,
        );
        setError(
            [
                props.error,
                setCategoryProps.error,
                delCategoryProps.error,
                moveUpProps.error,
                moveDownProps.error,
            ]
                .filter((item) => item)
                .map((item) =>
                    JSON.stringify('data' in item! ? item.data : item),
                )
                .join('; '),
        );
    }, [props, setCategoryProps, delCategoryProps, moveUpProps, moveDownProps]);

    const onSave = useCallback((item: CategoryType) => {
        setCategory(item);
    }, []);

    const onDelete = useCallback((id: number) => {
        delCategory(id);
    }, []);

    const onMoveUp = useCallback((id: number) => {
        moveUp(id);
    }, []);

    const onMoveDown = useCallback((id: number) => {
        moveDown(id);
    }, []);

    return (
        <TablePage
            error={error}
            refresh={props.refetch}
            title="Categories administration">
            <TableContainer component={Paper} aria-readonly={isLoading}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Up</TableCell>
                            <TableCell>Down</TableCell>
                            <TableCell>Visible?</TableCell>
                            <TableCell width={'30%'}>Name</TableCell>
                            <TableCell width={'20%'}>Link</TableCell>
                            <TableCell>Save</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data &&
                            data.map((item) => (
                                <CategoryEditRow
                                    item={item}
                                    key={item.id}
                                    onSave={onSave}
                                    onDelete={onDelete}
                                    onUp={onMoveUp}
                                    onDown={onMoveDown}
                                    readonly={isLoading}
                                    onLoading={setIsLoading}
                                />
                            ))}
                        <CategoryEditRow
                            item={{
                                id: 0,
                                link: '',
                                name: '',
                                visible: true,
                            }}
                            onSave={onSave}
                            readonly={isLoading}
                            onLoading={setIsLoading}
                        />
                    </TableBody>
                </Table>
            </TableContainer>
        </TablePage>
    );
};
