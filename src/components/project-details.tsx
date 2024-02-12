'use client'

import React from 'react'
import Image from 'next/image'
import AnimatedText from '../animations/text-animation'
import { motion } from 'framer-motion'
import styles from '../styles/details.module.css'

type ProjectProps = {
	id: number
	title: string
	image: string
	summary: string | null
	demo: string
}

function ProjectDetails({ project }: { project: ProjectProps }) {
	const summary: string = project.summary!

	return (
		<div className={styles['details-main']}>
			<AnimatedText
				text={project.title}
				el='h1'
				delay={0.5}
				scale={0}
				className={styles['project-name']}
			/>
			{project && (
				<div className={styles['details-container']}>
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
					<p className={styles['details-summary']}>{summary}</p>
				</div>
			)}
			<motion.div
				className={styles['link-container']}
				whileHover={{ scale: 1.1 }}
			>
				<a
					href={project.demo}
					target='_blank'
					rel='noreferrer'
					className={styles['live-demo']}
				>
					Visit {project.title}
				</a>
			</motion.div>
		</div>
	)
}

export default ProjectDetails
