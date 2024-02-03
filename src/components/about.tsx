'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import AnimatedText from './text-animation'
import AnimatedWord from './word-animation'
import { Reveal } from '@/animations/reveal'
import styles from '../styles/about.module.css'
import { useState } from 'react'

type AboutProps = {
	id: number
	title: string
	bio: string
	image: string
	questions: string[]
	answers: string[]
}

type TechnologyProps = {
	id: number
	tech_stack: string
	images: string[]
	labels: string[]
}

export default function About({
	about,
	technologies,
}: {
	about: AboutProps
	technologies: TechnologyProps[]
}) {
	const [questionNumber, setQuestionNumber] = useState(0)

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
			<div className={styles['about-hero']}>
				<Image
					src={`/images/${about.image}`}
					alt={about.title}
					loading='eager'
					className={styles['about-img']}
					width={340}
					height={240}
					sizes='(min-width: 300px) 100vw'
					placeholder='blur'
					blurDataURL={`/images/${about.image}`}
				/>
				<div className={styles['overlay-text']}>
					<AnimatedText
						text='About Me'
						className={styles.title}
						el={'h1'}
						once
						delay={2}
					/>
					<AnimatedWord
						el='h4'
						text={about.title}
						className={styles['sub-title']}
					/>
				</div>
			</div>
			{/* <AnimatedWord el='p' text={about.bio} className={styles.bio} /> */}
			<Reveal el='p' y={100} className={styles.bio}>
				{about.bio}
			</Reveal>
			<AnimatedWord
				el='h3'
				text='Click the Questions you may have'
				className={styles.click}
			/>
			<section className={styles['questions-container']}>
				{about.questions.map((question, index) => (
					<Reveal
						key={about.id}
						el='div'
						className={styles.question}
						onClick={() => {
							setQuestionNumber(index + 1)
						}}
						y={100}
					>
						<h4>
							{questionNumber !== index + 1 ? question : about.answers[index]}
						</h4>
					</Reveal>
				))}
			</section>
			<section className={styles['tech-stacks']}>
				<h1></h1>
				<AnimatedWord
					el='h1'
					text='Some of the Technology Stacks I Love and Use Proficiently'
				/>
				{technologies.map((technology, index) => (
					<div
						key={technology.id}
						className={
							styles[
								`${technology.tech_stack.toLowerCase().split(' ').join('-')}`
							]
						}
					>
						<AnimatedText
							el='h1'
							text={technology.tech_stack}
							delay={index + 1}
							once
						/>
						<div className={styles['tech-stack-images']}>
							{technology.images.map((img, idx) => (
								<Reveal key={idx} el='div' y={100} delay={idx + 1}>
									<figure key={idx} className={styles.figure}>
										<Image
											src={`/images/technologies/${img}`}
											alt={technology.tech_stack}
											loading='eager'
											className={styles['tech-img']}
											width={140}
											height={100}
											sizes='(min-width: 300px) 100vw'
											placeholder='blur'
											blurDataURL={`/images/technologies/${img}`}
										/>
										<figcaption>{technology.labels[idx]}</figcaption>
									</figure>
								</Reveal>
							))}
						</div>
					</div>
				))}
			</section>
		</motion.main>
	)
}
