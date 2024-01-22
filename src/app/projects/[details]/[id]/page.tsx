import prisma from '../../../../lib/db'
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

async function getCurrentProject(params: number) {
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
	const project = await getCurrentProject(Number(params.id))
	return (
		<div className={styles['details-main']}>
			<h1>Project Details</h1>
			<h4>{project ? project.title : null}</h4>
		</div>
	)
}
