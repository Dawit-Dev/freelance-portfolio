import prisma from '@/lib/db'
import ProjectDetails from '@/components/project-details'

export async function generateStaticParams() {
	const projects = await prisma.project.findMany()

	return projects.map(project => [
		{
			details: [
				project.title.toLowerCase().split(' ').join('-'),
				`${project.id}`,
			],
		},
	])
}

async function getCurrentProject(params: number) {
	const project = await prisma.project.findUnique({
		where: {
			id: params,
		},
	})

	return project
}

export default async function ProjectDetailsPage({
	params,
}: {
	params: { details: string[] }
}) {
	const paramsList = params.details
	const id = paramsList[1]
	const project = await getCurrentProject(Number(id))

	const copiedProject: object | any = project!
	const summary: string = copiedProject.summary!
	copiedProject.summary = summary

	return <ProjectDetails project={copiedProject} />
}
