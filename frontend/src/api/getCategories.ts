import { ICategory } from "@/types/type";

export async function getCategories(): Promise<ICategory[]> {
	let result: ICategory[] = []
	const res = await fetch(`${process.env._API_URL_}/mainmenu`);
	if (res.ok)
		result = await res.json();
	return result
}