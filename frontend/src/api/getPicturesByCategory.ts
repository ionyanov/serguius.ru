import { IPicture } from "@/types/type";

export async function getPicturesByCategory(category: string): Promise<IPicture[]> {
	let result: IPicture[] = []
	const res = await fetch(`${process.env._API_URL_}/picture/${category}`);
	if (res.ok)
		result = await res.json();
	return result
}