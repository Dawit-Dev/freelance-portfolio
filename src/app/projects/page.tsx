import prisma from '../../lib/db.ts'
import styles from '../../styles/projects.module.css'
import Link from 'next/link'

export const getProjects = async () => {
	const projects = await prisma.project.findMany()
	return projects
}

export default async function Projects() {
	const projects = await getProjects()

	return (
		<main className={styles['projects-main']}>
			<h1>Projects Page</h1>
			<div className={styles['projects-wrapper']}>
				{projects.length &&
					projects.map((project: object | any, index: number) => (
						<Link
							href={`projects/${project.title
								.toLowerCase()
								.split(' ')
								.join('-')}/${project.id}`}
							key={index}
						>
							<h4>{project.title}</h4>
						</Link>
					))}
			</div>
		</main>
	)
}
