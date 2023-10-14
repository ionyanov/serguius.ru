export const formatDate = (param: any): string => {
	if (!param) return '';
	const date = new Date(Date.parse(param as any));
	return `${date.getDate()}.${date.getUTCMonth() + 1
		}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
};