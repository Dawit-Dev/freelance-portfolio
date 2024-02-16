'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Reveal from '@/animations/reveal'
import AnimatedWord from '../animations/word-animation'
import AnimatedCharacter from '../animations/char-animation'
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

	const pageVariant = {
		visible: {
			opacity: 1,
			transition: { type: 'spring', stiffness: 30, delay: 0.5, duration: 2 },
		},
		hidden: { opacity: 0 },
	}

	return (
		<motion.main
			variants={pageVariant}
			initial='hidden'
			whileInView='visible'
			className={styles['services-main']}
		>
			<Reveal el='div' scale={0} delay={0.5} once>
				<div className={styles.headings}>
					<h1 className={styles['primary-heading']}>Areas of My Services</h1>
					<h4 className={styles['secondary-heading']}>
						I Look Forward to Changing Your Dreams into Reality
					</h4>
				</div>
			</Reveal>
			<div className={styles.services}>
				{services.map((service, index) => (
					<div key={service.id} className={styles['service-container']}>
						<AnimatedCharacter
							text={service.name}
							el='h3'
							y={-20}
							once
							className={styles['service-name']}
						/>
						<Reveal
							el='div'
							y={100}
							delay={2}
							amount={0.1}
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
								<p className={styles['service-description']}>
									{service.description}
								</p>
							</div>
						</Reveal>
					</div>
				))}
			</div>
			<div className={styles['take-action']}>
				<AnimatedWord
					text='Interested in one of my services?'
					el='h3'
					once
					y={-20}
					className={styles.invite}
				/>
				<motion.div whileHover={{ scale: 1.1, color: 'var(--secondary-text)' }}>
					<Link href={'/contact'} className={styles['contact-btn']}>
						Get in Touch
					</Link>
				</motion.div>
			</div>
		</motion.main>
	)
}
