'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/animations/reveal'
import AnimatedWord from './word-animation'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHtml5 } from "@fortawesome/free-brands-svg-icons";
// import { config } from "@fortawesome/fontawesome-svg-core";
// import "@fortawesome/fontawesome-svg-core/styles.css";
// config.autoAddCss = false;
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
			<div className={styles.headings}>
				<h1 className={styles['primary-heading']}>Areas of Our Services</h1>
				<h4 className={styles['secondary-heading']}>
					We are Passionate to Changing Your Dreams into Reality
				</h4>
			</div>
			<div className={styles.services}>
				{services.map((service, index) => (
					<div key={service.id} className={styles['service-container']}>
						<h3 className={styles['service-name']}>{service.name}</h3>
						<Reveal el='div' y={200} once className={styles.reveal}>
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
					text='Interested in one of our services?'
					el='h3'
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
