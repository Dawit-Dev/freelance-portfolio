import prisma from '../../../../lib/db.ts'
import styles from '../../../../styles/details.module.css'

export async function generateStaticParams() {
	const projects = await prisma.project.findMany()

	return projects.map(project => [
		{
			details: project.title,
			id: project.id,
		},
	])
}

async function getCurrentProject(params) {
	const project = await prisma.project.findUnique({
		where: {
			id: params,
		},
	})

	return project
}

export default async function ProjectDetails({
	params,
}: {
	params: { details: string; id: string }
}) {
	const { details, id } = params
	const project = await getCurrentProject(Number(id))
	return (
		<div className={styles['details-main']}>
			<h1>Project Details</h1>
			<h4>{project.title}</h4>
		</div>
	)
}
