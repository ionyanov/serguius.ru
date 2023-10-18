import { IPicture } from "@/types/type";

export async function getRandomPictures(): Promise<IPicture[]> {
	const randomPictures = await fetch(`${process.env._API_URL_}/random/${process.env._RANDOM_IMAGE_COUNT_}`).then(res => res.json())
	return randomPictures
}