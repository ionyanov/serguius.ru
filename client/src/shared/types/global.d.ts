declare module '*.png';
declare module '*.jpg';

type DeepPartial<T> = T extends object
    ? {
        [P in keyof T]?: DeepPartial<T[P]>;
    }
    : T;

type OptionalRecord<K extends keyof any, T> = {
    [P in K]?: T;
};

interface ReducerData<T> {
    data: T;
    isLoading: boolean;
}