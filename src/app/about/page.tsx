import prisma from "@/lib/db"
import About from "@/components/about"

async function getAboutData() {
	const about = await prisma.about.findMany()
	return about[0]
}

async function getTechData() {
	const technologies = await prisma.technology.findMany()
	return technologies
}

export default async function AboutPage() {
	const about = await getAboutData()
	const technologies = await getTechData()

	return <About about={about} technologies={technologies} />
}
