import prisma from '@/lib/db'
import About from '@/components/about'

export const getAboutData = async () => {
	const about = await prisma.about.findMany()
	const technologies = await prisma.technology.findMany()
	return { about: about[0], technologies: technologies }
}

export default async function AboutPage() {
	const { about, technologies } = await getAboutData()

	return <About about={about} technologies={technologies} />
}
