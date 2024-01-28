import prisma from '../../lib/db'
import Projects from '@/components/projects'

export const getProjects = async () => {
	const projects = await prisma.project.findMany()
	return projects
}

export default async function ProjectsPage() {
	const projects = await getProjects()

	return <Projects projects={projects} />
}
