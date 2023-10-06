import { Autocomplete, TextField } from '@mui/material';

interface MultiSelectorProp<T> {
    allValues: T[];
    selectedValues: T[];
    getLabel: (option: string | T) => string;
    comparer?: (option: string | T, value: string | T) => boolean;
    onSelectValue?: (option: string | T | undefined) => void;
    onDeleteValue?: (option: string | T | undefined) => void;
}

export function MultiSelector<T>(args: MultiSelectorProp<T>) {
    return (
        <Autocomplete
            multiple
            filterSelectedOptions
            options={args.allValues}
            getOptionLabel={args.getLabel}
            value={args.selectedValues}
            renderInput={(params) => <TextField {...params} />}
            onChange={(event, newValue, reason, details) => {
                if (reason == 'removeOption' && args.onDeleteValue)
                    args.onDeleteValue(details?.option);
                if (reason == 'selectOption' && args.onSelectValue)
                    args.onSelectValue(details?.option);
            }}
            isOptionEqualToValue={args.comparer}
        />
    );
}
