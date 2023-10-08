import { FC, useCallback, useState } from 'react';
import { useGetCategoriesQuery } from '../model/category.api';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView, TreeItem } from '@mui/x-tree-view';
import { Typography } from '@mui/material';

interface CategorySelectorProps {
    onSelect: (value: string) => void;
}

export const CategorySelector: FC<CategorySelectorProps> = (props) => {
    const { data, ...dataProps } = useGetCategoriesQuery();

    const handleSelect = (event: React.SyntheticEvent, nodeId: string) => {
        props.onSelect(nodeId);
    };

    const getItem = useCallback(
        (parentId?: number) => {
            if (!data) return <></>;
            return data
                .filter((item) => item.parCategoryId == parentId)
                .map((item) => (
                    <TreeItem
                        nodeId={item.link.toString()}
                        key={item.id}
                        label={
                            <Typography variant="h4">{item.name}</Typography>
                        }>
                        {getItem(item.id)}
                    </TreeItem>
                ));
        },
        [data],
    );

    return (
        <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            aria-label="controlled"
            onNodeSelect={handleSelect}>
            {getItem()}
        </TreeView>
    );
};
