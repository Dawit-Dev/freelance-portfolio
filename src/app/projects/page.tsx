import prisma from '../../lib/client'
import Projects from '@/components/projects'

const getProjects = async () => {
	const projects = await prisma.project.findMany()
	return projects
}

export default async function ProjectsPage() {
	const projects = await getProjects()

	return <Projects projects={projects} />
}
