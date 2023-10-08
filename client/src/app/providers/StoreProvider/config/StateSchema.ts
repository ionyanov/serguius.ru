import {
    type AnyAction,
    type CombinedState,
    type EnhancedStore,
    type Reducer,
    type ReducersMapObject,
} from '@reduxjs/toolkit';
import { type AxiosInstance } from 'axios';
import { type rtkAPI } from '@/shared/api/rtkAPI';
import { type IUserSchema } from '@/entities/User';

export interface StateSchema {
    user: IUserSchema;
    // Async
    [rtkAPI.reducerPath]: ReturnType<typeof rtkAPI.reducer>;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (
        state: StateSchema,
        action: AnyAction,
    ) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager?: ReducerManager;
}

export interface ThunkConfig<T> {
    rejectValue: T;
}
