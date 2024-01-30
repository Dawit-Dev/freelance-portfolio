'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import styles from '../styles/services.module.css'

type ServiceProps = {
	id: number
	name: string
	image: string
	description: string
}

export default function Services({ services }: { services: ServiceProps[] }) {
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
						<h3>{service.name}</h3>
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
					</div>
				))}
			</div>
		</motion.main>
	)
}
