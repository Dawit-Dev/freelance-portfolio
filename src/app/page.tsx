import prisma from '@/lib/db'
import Home from '../components/home'

const getProfile = async () => {
	const profile = await prisma.profile.findMany()
	const testimonials = await prisma.testimonial.findMany()
	return { profile: profile[0], testimonials }
}

export default async function HomePage() {
	const { profile, testimonials } = await getProfile()

	return <Home profile={profile} testimonials={testimonials} />
}
