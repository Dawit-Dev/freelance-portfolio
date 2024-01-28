'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../../../styles/details.module.css'

const projectState = history.state

export default function ProjectDetails() {
	const [project, setProject] = useState<{
		id: number
		title: string
		image: string
		summary: string | null
		demo: string
	}>({ id: 0, title: '', image: '', summary: '', demo: '' })

	useEffect(() => {
		setProject(projectState.state)
	}, [])

	return (
		<div className={styles['details-main']}>
			<h1 className={styles['project-name']}>{project.title}</h1>
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
					<p>{project.summary ? project.summary : ''}</p>
				</div>
			)}
		</div>
	)
}
