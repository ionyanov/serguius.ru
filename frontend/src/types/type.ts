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
	size?: string;
	categoryId?: number;
	category: {
		name: string,
		link: string
	}
}

export interface CategoryPageProps {
	params: { category: string[] };
}

export interface CategoryLayoutProps extends CategoryPageProps {
	children: React.ReactNode
}