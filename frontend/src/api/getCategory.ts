import { ICategory } from "@/types/type";

export async function getCategory(category?: string): Promise<ICategory | undefined> {
	if (!category) return undefined
	const result: ICategory = await fetch(`${process.env._API_URL_}/category/${category}`).then(res => res.json())
	return result;
}