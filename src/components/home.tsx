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
    const ref = useRef(null)
    const text:string = intro!
	const pageVariant = {
		visible: {
			opacity: 1,
			y: 0,
			transition: { type: 'spring', stiffness: 30, delay: 0.5 },
		},
		hidden: { opacity: 0, y: -300 },
	}

	const heroVariant = {
		visible: {
			opacity: 1,
			scale: 1,
			transition: { type: 'spring', stiffness: 30, delay: 1 },
		},
		hidden: { opacity: 0, scale: 0 },
	}

	const linksVariant = {
		visible: {
			opacity: 1,
			scale: 1,
			transition: { type: 'spring', stiffness: 30, delay: 11 },
		},
		hidden: { opacity: 0, scale: 0 },
	}

	const leftVariant = {
		visible: {
			opacity: 1,
			x: 0,
			transition: { type: 'spring', stiffness: 30, delay: 0.5 },
		},
		hidden: { opacity: 0, x: -300 },
	}

	const rightVariant = {
		visible: {
			opacity: 1,
			x: 0,
			transition: { type: 'spring', stiffness: 30, delay: 0.5 },
		},
		hidden: { opacity: 0, x: 300 },
	}

	return (
		<motion.main
			className={styles.main}
			ref={ref}
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
					className={styles['bg-img']}
					width={340}
					height={240}
					sizes='(min-width: 300px) 100vw'
					placeholder='blur'
					blurDataURL={'hero-bg.jpg'}
				/>
				<div className={styles['overlay-text']}>
					<AnimatedText text={title} className={styles.title} el={'h1'} once />
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
				<AnimatedWord text={text} el='p' once className={styles.intro} />
				<section>
					{sub_titles.map((title: string, index: number) => (
						<div key={index}>
							<AnimatedText
								text={title}
								el={'h3'}
								once
								className={styles['sub-title']}
							/>
							<div className={styles.development}>
								<motion.div
									variants={leftVariant}
									initial='hidden'
									whileInView='visible'
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
								<motion.p
									variants={rightVariant}
									initial='hidden'
									whileInView='visible'
									className={styles.description}
								>
									{description[index]}
								</motion.p>
							</div>
						</div>
					))}
				</section>
			</div>
		</motion.main>
	)
}
