'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import AnimatedText from '../animations/text-animation'
import { useRouter, usePathname } from 'next/navigation'
// Importing static images

import styles from '../styles/projects.module.css'
import ProjectImage from './project-image'

type ProjectProps = {
	id: number
	title: string
	image: string
	summary: string | null
	demo: string
	code: string
}

export default function Projects({ projects }: { projects: ProjectProps[] }) {
	const router = useRouter()
	const pathname = usePathname()

	const scrollVariant = {
		visible: (index: number) => ({
			opacity: 1,
			scale: 1,
			transition: {
				duration: 1,
				delay: 0.3 * index,
			},
		}),
		hidden: { opacity: 0, scale: 0 },
	}

	return (
		<main className={styles['projects-main']}>
			<AnimatedText
				text='Check out my Projects'
				el='h1'
				x={200}
				scale={2}
				delay={3}
				once
				className={styles['page-title']}
			/>
			<div className={styles['projects-wrapper']}>
				{projects &&
					projects.map((project: object | any, index: number) => (
						<motion.div
							variants={scrollVariant}
							initial='hidden'
							whileInView='visible'
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							viewport={{ amount: 0.1 }}
							custom={index}
							key={index}
							className={styles['project-wrapper']}
							onClick={() => {
								const newPath =
									pathname +
									`/${project.title.toLowerCase().split(' ').join('-')}/${
										project.id
									}`
								router.push(newPath)
							}}
						>
							<h4 className={styles['project-title']}>{project.title}</h4>
							<div className={styles['image-tooltip-container']}>
								<ProjectImage src={project.image} alt={project.title} />
								<span className={styles.tooltip}>
									Click to view project details
								</span>
							</div>

							<a
								href={project.demo}
								target='_blank'
								rel='noreferrer'
								className={styles['live-demo-link']}
							>
								Live Demo
							</a>
						</motion.div>
					))}
			</div>
		</main>
	)
}
