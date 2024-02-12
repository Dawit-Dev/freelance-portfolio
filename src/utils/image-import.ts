// todo - Dynamic image import
import Image from 'next/image'

export function getImageUrl(src: string) {
	return new URL(`../../public/images/${src}`, import.meta.url).href
}
