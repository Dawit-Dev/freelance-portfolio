'use client'

import { motion } from 'framer-motion'
import styles from '../styles/about.module.css'

export default function About() {
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
			className={styles['about-main']}
		>
			<h1>About Page</h1>
		</motion.main>
	)
}
