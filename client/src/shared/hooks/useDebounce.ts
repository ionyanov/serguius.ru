import { type MutableRefObject, useCallback, useRef } from 'react';

export function useDebounce(
    callback: (...args: any[]) => void,
    delay: number,
): (...args: any[]) => void {
    const timer: MutableRefObject<any> = useRef();
    return useCallback(
        (...args: any[]) => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
            timer.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay],
    );
}
