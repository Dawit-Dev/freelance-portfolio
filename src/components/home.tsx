'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import AnimatedText from './text-animation'
import AnimatedWord from './word-animation'
import Link from 'next/link'
import styles from '../styles/home.module.css'

type HomeProps = {
	title: string
	intro: string | null
	sub_titles: string[]
	images: string[]
	description: string[]
}

export default function Home({
	title,
	intro,
	sub_titles,
	images,
	description,
}: HomeProps) {
	const leftScrollRef = useRef(null)
	const rightScrollRef = useRef(null)
	const text: string = intro!

	const pageVariant = {
		visible: {
			opacity: 1,
			y: 0,
			transition: { type: 'spring', stiffness: 30, duration: 4 },
		},
		hidden: { opacity: 0, y: -300 },
	}

	const heroVariant = {
		visible: {
			opacity: 1,
			scale: 1,
			transition: { type: 'spring', stiffness: 30, delay: 0.5 },
		},
		hidden: { opacity: 0, scale: 0 },
	}

	const linksVariant = {
		visible: {
			opacity: 1,
			scale: 1,
			transition: { type: 'spring', stiffness: 30, delay: 13 },
		},
		hidden: { opacity: 0, scale: 0 },
	}

	const leftVariant = {
		visible: {
			opacity: 1,
			x: 0,
			transition: { type: 'spring', stiffness: 30, delay: 0.5, duration: 3 },
		},
		hidden: { opacity: 0, x: -100 },
	}

	const rightVariant = {
		visible: {
			opacity: 1,
			x: 0,
			transition: { type: 'spring', stiffness: 30, delay: 0.5, duration: 3 },
		},
		hidden: { opacity: 0, x: 100 },
	}

	return (
		<motion.main
			className={styles.main}
			variants={pageVariant}
			initial='hidden'
			whileInView='visible'
		>
			<motion.section
				className={styles.hero}
				variants={heroVariant}
				initial='hidden'
				whileInView='visible'
				viewport={{ amount: 0.1, once: true }}
			>
				<Image
					src={'/images/hero-bg.jpg'}
					alt={title}
					loading='eager'
					className={styles['sm-bg-img']}
					width={340}
					height={240}
					sizes='(min-width: 300px) 100vw'
					placeholder='blur'
					blurDataURL={'hero-bg.jpg'}
				/>
				<Image
					src={'/images/hero-bg-resized.jpg'}
					alt={title}
					loading='eager'
					className={styles['lg-bg-img']}
					width={340}
					height={240}
					sizes='(min-width: 300px) 100vw'
					placeholder='blur'
					blurDataURL={'hero-bg.jpg'}
				/>
				<div className={styles['overlay-text']}>
					<AnimatedText
						text={title}
						className={styles.title}
						el={'h1'}
						scale={3}
						y={200}
						once
						delay={2}
					/>
					<motion.div
						className={styles['links-wrapper']}
						variants={linksVariant}
						initial='hidden'
						whileInView='visible'
						viewport={{ amount: 0.1, once: true }}
					>
						<Link href={'/services'} className={styles.link}>
							Services
						</Link>
						<Link href={'/projects'} className={styles.link}>
							Projects
						</Link>
					</motion.div>
				</div>
			</motion.section>
			<div className={styles.wrapper}>
				<AnimatedWord
					text={text}
					el='p'
					delay={0.5}
					once
					className={styles.intro}
				/>
				<section>
					{sub_titles.map((title: string, index: number) => (
						<div key={index}>
							<AnimatedText
								text={title}
								el={'h3'}
								y={20}
								once
								delay={index + 1}
								className={styles['sub-title']}
							/>
							<div className={styles.development}>
								<motion.div
									variants={leftVariant}
									initial='hidden'
									whileInView='visible'
									viewport={{ root: leftScrollRef, amount: 0.5, once: true }}
								>
									<Image
										src={`/images/${images[index]}`}
										alt={title}
										loading='eager'
										className={styles['tech-img']}
										width={340}
										height={240}
										sizes='(min-width: 300px) 100vw'
										placeholder='blur'
										blurDataURL={`/images/${images[index]}`}
									/>
								</motion.div>
								<motion.div
									variants={rightVariant}
									initial='hidden'
									whileInView='visible'
									viewport={{ root: rightScrollRef, amount: 0.5, once: true }}
								>
									<AnimatedWord
										text={description[index]}
										el='p'
										delay={0.5}
										once
										className={styles.description}
									/>
								</motion.div>
							</div>
						</div>
					))}
				</section>
			</div>
			<motion.div
				className={styles['action-btn-wrapper']}
				whileHover={{ scale: 1.1 }}
			>
				<Link href={'/services'} className={styles['action-btn']}>
					Check out My Services
				</Link>
			</motion.div>
		</motion.main>
	)
}
