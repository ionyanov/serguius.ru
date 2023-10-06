import { type MutableRefObject, useEffect } from 'react';

export interface UseInfiniteScrollOptions {
    callback?: () => void;
    triggerRef: MutableRefObject<HTMLElement>;
    wrapperRef: MutableRefObject<HTMLElement>;
}

export function useInfiniteScroll(props: UseInfiniteScrollOptions): void {
    useEffect(() => {
        let observer: IntersectionObserver;
        const wrapperElement = props.wrapperRef.current;
        const triggerElement = props.triggerRef.current;

        if (props.callback) {
            const option = {
                root: wrapperElement,
                rootMargin: '0px',
                threshold: 1.0,
            };

            const observer = new IntersectionObserver(([entries, observer]) => {
                if (entries.isIntersecting) {
                    props.callback?.();
                }
            }, option);

            observer.observe(triggerElement);
        }

        return () => {
            if (observer && triggerElement) {
                observer.unobserve(triggerElement);
            }
        };
    }, [props]);
}
