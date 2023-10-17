import { IPicture } from "@/types/type";

let randomPictures: IPicture[];
export async function getRandomPictures(): Promise<IPicture[]> {
	if (!randomPictures) {
		const res = await fetch(`${process.env._API_URL_}/random/${process.env._RANDOM_IMAGE_COUNT_}`);
		if (res.ok)
			randomPictures = await res.json();
	}
	return randomPictures
}