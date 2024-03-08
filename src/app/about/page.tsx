import prisma from '@/lib/client'
import About from '@/components/about'

async function getData() {
	const about = await prisma.about.findMany()
	const technologies = await prisma.technology.findMany()
	return { about: about[0], technologies }
}

export default async function AboutPage() {
	const { about, technologies } = await getData()
	return <About about={about} technologies={technologies} />
}
