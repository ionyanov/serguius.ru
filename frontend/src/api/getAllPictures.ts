import { IPicture } from "@/types/type";

export async function getAllPictures(): Promise<IPicture[]> {
	let result: IPicture[] = await fetch(`${process.env._API_URL_}/picture`)
		.then(res => {
			if (res.ok) return res.json();
			return []
		});
	return result
}