import { type Reducer } from '@reduxjs/toolkit';
import { type FC, type HTMLAttributes, useEffect } from 'react';
import { useStore } from 'react-redux';
import { useAppDispatch } from '../hooks/useAppDispatch';
import {
    type ReduxStoreWithManager,
    type StateSchema,
} from '@/app/providers/StoreProvider';
import { StateSchemaKey } from '@/app/providers/StoreProvider/config/StateSchema';

export type ReducerList = {
    [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
};

interface DynamicModuleLoaderProps extends HTMLAttributes<HTMLElement> {
    reducers: ReducerList;
    removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
    const { removeAfterUnmount = true, reducers } = props;

    const store = useStore() as ReduxStoreWithManager;
    const dispatch = useAppDispatch();

    useEffect(() => {
        const mountedReducers = store.reducerManager?.getReducerMap();
        Object.entries(reducers).forEach(([name, reducer]) => {
            const mounted = mountedReducers?.[name as StateSchemaKey];
            // Добавляем новый редюсер только если его нет
            if (!mounted) {
                store.reducerManager?.add(name as StateSchemaKey, reducer);
                //dispatch({ type: `@INIT ${name} reducer` });
            }
        });

        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name, reducer]) => {
                    //dispatch({ type: `@DESTROY ${name} reducer` });
                    store.reducerManager!.remove(name as StateSchemaKey);
                });
            }
        };
    }, [dispatch, reducers, removeAfterUnmount, store.reducerManager]);

    return <>{props.children}</>;
};
