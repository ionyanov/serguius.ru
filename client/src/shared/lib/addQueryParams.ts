export function getQueryParams(
    params: OptionalRecord<string, string | number>,
): string {
    const searchParams = new URLSearchParams(window.location.search);
    Object.entries(params).forEach(([name, value]) => {
        if (value) {
            searchParams.set(name, value.toString());
        }
    });
    return `?${searchParams.toString()}`;
}

/**
 * Функция добавления параметров в строку запроса
 * @param params
 */
export function addQueryParams(
    params: OptionalRecord<string, string | number>,
): void {
    window.history.pushState(null, '', getQueryParams(params));
}
