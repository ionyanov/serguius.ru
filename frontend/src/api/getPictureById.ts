import { IPicture } from "@/types/type";

export async function getPictureById(id: number): Promise<IPicture | undefined> {
	let result: IPicture
	const res = await fetch(`${process.env._API_URL_}/picture/id/${id}`);
	if (res.ok)
		result = await res.json();
	return result
}