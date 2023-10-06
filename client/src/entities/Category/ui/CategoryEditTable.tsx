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
    useDeleteCategoryMutation,
    useGetCategoriesQuery,
    useUpsertCategoryMutation,
} from '../model/category.api';
import { TablePage } from '@/shared/ui';

export const CategoryEditTable: FC = () => {
    const { data, ...props } = useGetCategoriesQuery();
    const [upsertCategory, upsertCategoryProps] = useUpsertCategoryMutation();
    const [deleteCategory, deleteCategoryProps] = useDeleteCategoryMutation();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setIsLoading(
            props.isLoading ||
                upsertCategoryProps.isLoading ||
                deleteCategoryProps.isLoading,
        );
        setError(
            JSON.stringify([
                props.error,
                upsertCategoryProps.error,
                deleteCategoryProps.error,
            ]),
        );
    }, [props, upsertCategoryProps, deleteCategoryProps]);

    const onSave = useCallback((item: CategoryType) => {
        upsertCategory(item);
    }, []);

    const onDelete = useCallback((id: number) => {
        deleteCategory(id);
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
                            <TableCell>Order</TableCell>
                            <TableCell>Visible?</TableCell>
                            <TableCell width={'30%'}>Name</TableCell>
                            <TableCell width={'20%'}>Link</TableCell>
                            <TableCell width={'50%'}>Properties</TableCell>
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
                                    readonly={isLoading}
                                    onLoading={setIsLoading}
                                />
                            ))}
                        <CategoryEditRow
                            item={{
                                id: 0,
                                link: '',
                                name: '',
                                order: (data?.length ?? 0) + 1,
                                visible: true,
                            }}
                            onSave={onSave}
                            onDelete={onDelete}
                            readonly={isLoading}
                            onLoading={setIsLoading}
                        />
                    </TableBody>
                </Table>
            </TableContainer>
        </TablePage>
    );
};
