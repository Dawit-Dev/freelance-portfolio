import prisma from '../../../../lib/db'
import Image from 'next/image'
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
			{project && (
				<div className={styles['details-container']}>
					<h4>{project.title}</h4>
					<Image
						src={`/images/${project.image}`}
						alt={project.title}
						loading='eager'
						className={styles['details-img']}
						width={340}
						height={240}
						sizes='(min-width: 300px) 100vw'
						placeholder='blur'
						blurDataURL={`/images/${project.image}`}
					/>
				</div>
			)}
		</div>
	)
}
