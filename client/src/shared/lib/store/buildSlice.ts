import type { CreateSliceOptions, SliceCaseReducers } from '@reduxjs/toolkit';
import { bindActionCreators, createSlice } from '@reduxjs/toolkit';

import { useMemo } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';

export function buildSlice<
    State,
    CaseReducers extends SliceCaseReducers<State>,
    Name extends string = string,
>(options: CreateSliceOptions<State, CaseReducers, Name>) {
    const slice = createSlice(options);

    const useActions = (): typeof slice.actions => {
        const dispatch = useAppDispatch();

        // @ts-expect-error TEST
        return useMemo(
            // @ts-expect-error TEST
            () => bindActionCreators(slice.actions, dispatch),
            [dispatch],
        );
    };

    return {
        ...slice,
        useActions,
    };
}
