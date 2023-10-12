'use client'

interface ImageLoaderProps {
	src: string,
	width?: number,
	quality?: number
}

export default function ImageLoader({ src, width, quality }: ImageLoaderProps) {
	return `${process.env._IMAGE_PATH_}/${src}?w=${width}&q=${quality || 75}`
}