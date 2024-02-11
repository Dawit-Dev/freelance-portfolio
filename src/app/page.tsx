import prisma from "@/lib/db"
import Home from "../components/home"

const getProfile = async () => {
	const profile = await prisma.profile.findMany()
	return profile[0]
}

export default async function HomePage() {
	const content = await getProfile()

	return (
		<Home
			title={content.title}
			intro={content.intro}
			sub_titles={content.sub_titles}
			images={content.images}
			description={content.description}
		/>
	)
}
