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
import { CategoryEditRow } from './CategoryEditItem';
import {
    useDelCategoryMutation,
    useGetCategoriesQuery,
    useMoveDownMutation,
    useMoveUpMutation,
    useSetCategoryMutation,
} from '../model/category.api';
import { TablePage } from '@/shared/ui';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView, TreeItem } from '@mui/x-tree-view';
import { CategoryEditGroup } from './CategoryEditGroup';

export const CategoryEditTable: FC = () => {
    const { data, ...dataProps } = useGetCategoriesQuery();
    const [setCategory, setCategoryProps] = useSetCategoryMutation();
    const [delCategory, delCategoryProps] = useDelCategoryMutation();
    const [moveUp, moveUpProps] = useMoveUpMutation();
    const [moveDown, moveDownProps] = useMoveDownMutation();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setIsLoading(
            dataProps.isLoading ||
                setCategoryProps.isLoading ||
                delCategoryProps.isLoading ||
                moveUpProps.isLoading ||
                moveDownProps.isLoading,
        );
        setError(
            [
                dataProps.error,
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
    }, [
        dataProps,
        setCategoryProps,
        delCategoryProps,
        moveUpProps,
        moveDownProps,
    ]);

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
            refresh={dataProps.refetch}
            title="Categories administration">
            <TreeView
                sx={{ width: '100%' }}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}>
                <CategoryEditGroup
                    onSave={onSave}
                    onDelete={onDelete}
                    onUp={onMoveUp}
                    onDown={onMoveDown}
                    readonly={isLoading}
                    onLoading={setIsLoading}
                />
                <TreeItem
                    nodeId={`0new`}
                    label={
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
                    }
                />
            </TreeView>
        </TablePage>
    );
};
