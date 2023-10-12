export interface ICategory {
	id: number;
	name: string;
	link: string;
	parCategoryId?: number;
}

export interface IPicture {
	id: number;
	name: string;
	link: string;
	date?: string;
	material?: string;
	categoryId?: number;
	category: {
		name: string,
		link: string
	}
}