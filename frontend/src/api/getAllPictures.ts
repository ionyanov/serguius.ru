import { IPicture } from "@/types/type";

export async function getAllPictures(): Promise<IPicture[]> {
	let result: IPicture[] = []
	const res = await fetch(`${process.env._API_URL_}/picture`);
	if (res.ok)
		result = await res.json();
	return result
}