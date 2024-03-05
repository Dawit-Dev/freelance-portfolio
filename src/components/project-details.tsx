'use client'

import React from 'react'
import AnimatedCharacter from '../animations/char-animation'
import { motion } from 'framer-motion'
import { raleway, montserrat } from '@/styles/fonts'
import styles from '../styles/details.module.css'
import Reveal from '@/animations/reveal'
import ProjectImage from './project-image'

type ProjectProps = {
	id: number
	title: string
	image: string
	summary: string | null
	demo: string
}

function ProjectDetails({ project }: { project: ProjectProps }) {
	const summary: string = project.summary!

	const wrapSpanInParagraph = (text: string, span: string) => {
		const textArray = text.split(span)
		if (text.includes(span)) {
			return (
				<p>
					{textArray[0]}
					<span key={'key'} className={styles['external-link']}>
						{`https://${span}`}
					</span>
					{textArray[1]}
				</p>
			)
		}

		return text
	}

	return (
		<div className={styles['details-main']}>
			<AnimatedCharacter
				text={project.title}
				el='h1'
				delay={0.5}
				scale={0}
				once
				className={`${styles['project-name']} ${raleway.className}`}
			/>
			{project && (
				<div className={styles['details-container']}>
					<Reveal el='div' delay={1} duration={2} scale={0} once>
						<ProjectImage src={project.image} alt={project.title} />
					</Reveal>
					<div
						className={`${styles['details-summary-wrapper']} ${montserrat.className}`}
					>
						{summary.split(':').map((paragraph, index) => (
							<Reveal
								key={index}
								el='div'
								y={40}
								delay={index + 1}
								duration={1.5}
								once
							>
								<p className={styles['details-summary']}>
									{index === 0 && (
										<span className={styles['project-name-span']}>
											{project.title}
										</span>
									)}{' '}
									{wrapSpanInParagraph(
										paragraph,
										'www.timeout.com/film/best-movies-of-all-time'
									)}
								</p>
							</Reveal>
						))}
					</div>
				</div>
			)}

			<Reveal el='div' scale={0} delay={0.5} duration={1.5} once>
				<motion.div
					className={styles['link-container']}
					whileHover={{ scale: 1.1 }}
				>
					<a
						href={project.demo}
						target='_blank'
						rel='noreferrer'
						className={`${styles['live-demo']} ${raleway.className}`}
					>
						Visit {project.title}
					</a>
				</motion.div>
			</Reveal>
		</div>
	)
}

export default ProjectDetails
