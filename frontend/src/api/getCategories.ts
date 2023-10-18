import { ICategory } from "@/types/type";

export async function getCategories(): Promise<ICategory[]> {
	const result: ICategory[] = await fetch(`${process.env._API_URL_}/mainmenu`)
		.then(res => {
			if (res.ok) return res.json();
			return []
		});
	return result
}