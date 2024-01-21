import prisma from '../../lib/db.ts'
import styles from '../../styles/projects.module.css'

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
						<div key={index}>
							<h4>{project.title}</h4>
						</div>
					))}
			</div>
		</main>
	)
}
