import { IPicture } from "@/types/type";

export async function getPicturesByCategory(category: string): Promise<IPicture[]> {
	let result: IPicture[] = await fetch(`${process.env._API_URL_}/picture/${category}`).then(res => res.json());
	return result
}