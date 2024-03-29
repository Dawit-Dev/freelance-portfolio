'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Reveal from '@/animations/reveal'
import AnimatedWord from '../animations/word-animation'
import AnimatedCharacter from '../animations/char-animation'
import { raleway, playfairDisplay, montserrat } from '@/styles/fonts'
import styles from '../styles/services.module.css'

type ServiceProps = {
	id: number
	name: string
	image: string
	description: string
	technologies: string[]
}

export default function Services({ services }: { services: ServiceProps[] }) {
	services.sort((a, b) => a.id - b.id)
	const [switchText, setSwitchText] = useState(false)

	useEffect(() => {
		let interval: NodeJS.Timeout
		let duration: number
		const switchTextAnimation = () => {
			if (switchText) {
				duration = 4000
			} else {
				duration = 7000
			}
			interval = setInterval(async () => {
				setSwitchText(!switchText)
			}, 700)
		}
		switchTextAnimation()
		return () => clearInterval(interval)
	}, [switchText])

	return (
		<main className={styles['services-main']}>
			<Reveal
				el='div'
				scale={2}
				delay={0.5}
				y={100}
				duration={1.5}
				once
				className={styles.headings}
			>
				<h1 className={`${styles['primary-heading']} ${raleway.className}`}>
					Areas of My Services
				</h1>
				<AnimatedCharacter
					el='h4'
					text={'Turning Your Dreams into Reality'}
					y={20}
					delay={2}
					stagger={0.05}
					once
					className={`${styles['secondary-heading']} ${raleway.className}`}
				/>
			</Reveal>
			<div className={styles.services}>
				{services.map((service, index) => (
					<div key={service.id} className={styles['service-container']}>
						<AnimatedCharacter
							text={service.name}
							el='h2'
							y={-20}
							delay={index === 0 ? 3 : index / 2}
							stagger={0.14}
							once
							className={`${styles['service-name']} ${playfairDisplay.className}`}
						/>
						<Reveal
							el='div'
							y={100}
							delay={index === 0 ? 5 : (index + 2) / 2}
							amount={0.1}
							duration={1.5}
							once
							className={styles.reveal}
						>
							<div
								className={index % 2 ? styles['grid-odd'] : styles['grid-even']}
							>
								<Image
									src={`/images/${service.image}`}
									alt={service.name}
									loading='eager'
									className={styles['service-img']}
									width={340}
									height={240}
									sizes='(min-width: 300px) 100vw'
									placeholder='blur'
									blurDataURL={`/images/${service.image}`}
								/>
								<div className={styles['description-wrapper']}>
									{service.description.split(':').map((desc, idx) => (
										<p
											key={idx}
											className={`${styles['service-description']} ${montserrat.className}`}
										>
											{desc}
										</p>
									))}
								</div>
							</div>
						</Reveal>
					</div>
				))}
			</div>
			<Reveal el='div' delay={0.5} scale={0.5} duration={1.5}>
				<div className={styles['take-action']}>
					<AnimatedWord
						text='Interested in one of my services?'
						el='h3'
						once
						y={-20}
						className={`${styles.invite} ${raleway.className}`}
					/>
					<motion.div
						whileHover={{ scale: 1.1, color: 'var(--secondary-text)' }}
					>
						<Link
							href={'/contact'}
							className={`${styles['contact-btn']} ${raleway.className}`}
						>
							Get in Touch
						</Link>
					</motion.div>
				</div>
			</Reveal>
		</main>
	)
}
