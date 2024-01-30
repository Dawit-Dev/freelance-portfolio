import prisma from '@/lib/db'
import Services from '@/components/services'

export const getServices = async () => {
	const services = await prisma.service.findMany()
	return services
}

export default async function ServicesPage() {
	const services = await getServices()
	return <Services services={services} />
}
