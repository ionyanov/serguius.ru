import { IPicture } from "@/types/type";

export async function getPictureById(id: number): Promise<IPicture | undefined> {
	let result: IPicture = await fetch(`${process.env._API_URL_}/picture/id/${id}`).then(res => res.json());
	return result
}