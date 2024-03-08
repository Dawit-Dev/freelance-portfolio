import prisma from '@/lib/client'
import Services from '@/components/services'

const getServices = async () => {
	const services = await prisma.service.findMany()
	return services
}

export default async function ServicesPage() {
	const services = await getServices()
	return <Services services={services} />
}
