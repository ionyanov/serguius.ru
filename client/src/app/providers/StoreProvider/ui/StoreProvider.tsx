import { DeepPartial, type ReducersMapObject } from '@reduxjs/toolkit';
import { type FC, type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { type StateSchema } from '../config/StateSchema';
import { createReduxStore } from '../config/store';

interface StoreProviderProps {
    children?: ReactNode;
    initialState?: DeepPartial<StateSchema>;
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

export const StoreProvider: FC<StoreProviderProps> = (props) => {
    const store = createReduxStore(
        props.initialState as StateSchema,
        props.asyncReducers as ReducersMapObject<StateSchema>,
    );

    return <Provider store={store}>{props.children}</Provider>;
};
