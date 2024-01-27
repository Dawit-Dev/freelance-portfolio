'use client'
import styles from '../styles/projects.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import AnimatedText from './text-animation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

type ProjectProps = {
	id: number
	title: string
	image: string
	summary: string | null
	demo: string
	code: string
}

export default function Projects({ projects }: { projects: ProjectProps[] }) {
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
		<main className={styles["projects-main"]}>
			<AnimatedText
				text="Check out our Projects"
				el="h1"
				delay={3}
				once
				className={styles["page-title"]}
			/>
			<div className={styles["projects-wrapper"]}>
				{projects.length &&
					projects.map((project: object | any, index: number) => (
						<motion.div
							variants={scrollVariant}
							initial="hidden"
							whileInView="visible"
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							viewport={{ amount: 0.1 }}
							custom={index}
							key={index}
							className={styles["project-wrapper"]}
						>
							{/* <Link
								href={`projects/${project.title
									.toLowerCase()
									.split(' ')
									.join('-')}/${project.id}`}
							> */}
							<h4 className={styles["project-title"]}>{project.title}</h4>
							<div className={styles["image-tooltip-container"]}>
								<Image
									src={`/images/${project.image}`}
									alt={project.title}
									loading="eager"
									className={styles["project-img"]}
									width={340}
									height={240}
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									placeholder="blur"
									blurDataURL={`/images/${project.image}`}
								/>
								<span className={styles.tooltip}>
									Click to view project details
								</span>
							</div>
							{/* </Link> */}
							<div className={styles["project-links-wrapper"]}>
								<a
									href={project.demo}
									target="_blank"
									rel="noreferrer"
									className={styles["live-demo-link"]}
								>
									Live Demo
								</a>
							</div>
						</motion.div>
					))}
			</div>
		</main>
	);
}
