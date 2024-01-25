import prisma from '@/lib/db'
import HomePage from '../components/home'

export const getProfile = async () => {
	const profile = await prisma.profile.findMany()
	return profile[0]
}

export default async function Home() {
	const content = await getProfile()

	return (
		<HomePage
			title={content.title}
			intro={content.intro}
			sub_titles={content.sub_titles}
			images={content.images}
			description={content.description}
		/>
	)
}
