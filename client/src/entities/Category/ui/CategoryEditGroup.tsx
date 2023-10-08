import { FC } from 'react';
import { CategoryType } from '../model/category.type';
import { useGetCategoriesQuery } from '../model/category.api';
import { TreeItem } from '@mui/x-tree-view';
import { CategoryEditRow } from './CategoryEditItem';

interface CategoryEditRowProps {
    parentId?: number;
    readonly: boolean;
    onSave?: (item: CategoryType) => void;
    onDelete?: (id: number) => void;
    onUp?: (id: number) => void;
    onDown?: (id: number) => void;
    onLoading?: (isLoad: boolean) => void;
}

export const CategoryEditGroup: FC<CategoryEditRowProps> = (props) => {
    const { data, ...dataProps } = useGetCategoriesQuery();
    const { parentId, ...otherProps } = props;
    if (!data) return <></>;
    return (
        <>
            {data
                .filter((item) => item.parCategoryId == props.parentId)
                .map((item) => (
                    <TreeItem
                        nodeId={item.id.toString()}
                        key={item.id}
                        label={
                            <CategoryEditRow
                                item={item}
                                onSave={props.onSave}
                                onDelete={props.onDelete}
                                readonly={props.readonly}
                                onLoading={props.onLoading}
                                onUp={props.onUp}
                                onDown={props.onDown}
                            />
                        }>
                        <CategoryEditGroup {...otherProps} parentId={item.id} />
                        <TreeItem
                            nodeId={`${item.id}new`}
                            label={
                                <CategoryEditRow
                                    item={{
                                        id: item.id * -1,
                                        link: '',
                                        name: '',
                                        visible: true,
                                        parCategoryId: item.id,
                                    }}
                                    onSave={props.onSave}
                                    readonly={props.readonly}
                                    onLoading={props.onLoading}
                                />
                            }
                        />
                    </TreeItem>
                ))}
        </>
    );
};
