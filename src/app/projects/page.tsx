import prisma from '../../lib/db'
import styles from '../../styles/projects.module.css'
import Link from 'next/link'
import Image from 'next/image'

export const getProjects = async () => {
	const projects = await prisma.project.findMany()
	return projects
}

export default async function Projects() {
	const projects = await getProjects()

	return (
		<main className={styles['projects-main']}>
			<h1 className={styles['page-title']}>Projects Page</h1>
			<div className={styles['projects-wrapper']}>
				{projects.length &&
					projects.map((project: object | any, index: number) => (
						<Link
							href={`projects/${project.title
								.toLowerCase()
								.split(' ')
								.join('-')}/${project.id}`}
							key={index}
							className={styles['project-wrapper']}
						>
							<h4>{project.title}</h4>
							<div className={styles['image-tooltip-container']}>
								<Image
									src={`/images/${project.image}`}
									alt={project.title}
									loading='eager'
									className={styles['project-img']}
									width={340}
									height={240}
									sizes='(min-width: 300px) 100vw'
									placeholder='blur'
									blurDataURL={`/images/${project.image}`}
								/>
								<span className={styles.tooltip}>
									Click to view project details
								</span>
							</div>
						</Link>
					))}
			</div>
		</main>
	)
}
