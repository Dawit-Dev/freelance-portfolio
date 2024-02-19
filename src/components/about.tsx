'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import AnimatedCharacter from '../animations/char-animation'
import AnimatedWord from '../animations/word-animation'
import Reveal from '@/animations/reveal'
import FlipCard from './flip-card'
import styles from '../styles/about.module.css'

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
	const sortedTech: any = technologies.sort((a, b) => a.id - b.id)

	return (
		<main
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
				<AnimatedCharacter
					text='About Me'
					className={styles.title}
					el={'h1'}
					y={-20}
					once
					delay={1}
				/>
				<div className={styles['overlay-text']}>
					{about.title.split('.').map((title, index) => (
						<div key={index}>
							<AnimatedWord
								el={index === 0 ? 'h4' : 'p'}
								text={index === 0 ? title + '.' : title}
								once
								y={50}
								rotateY={360}
								rotateX={540}
								// x={50}
								delay={2 + index}
								// opacity={1}
								duration={2.5}
								className={index === 0 ? styles['sub-title'] : styles.remark}
							/>
						</div>
					))}
				</div>
			</div>
			<Reveal
				el='div'
				y={100}
				amount={0.2}
				duration={3}
				once
				className={styles.bio}
			>
				<p>{about.bio}</p>
			</Reveal>
			<AnimatedWord
				el='h3'
				text='Click the Questions to Reveal their Answers'
				once
				y={-20}
				className={styles.click}
			/>
			<section className={styles['questions-container']}>
				{about.questions.map((question, index) => (
					<Reveal
						el='div'
						scale={0}
						delay={index / 2}
						duration={3}
						once
						amount={0.1}
						key={about.id}
					>
						<FlipCard
							question={question}
							answer={about.answers[index]}
							id={about.id}
						/>
					</Reveal>
				))}
			</section>
			<section className={styles['tech-stacks']}>
				<AnimatedWord
					el='h3'
					text='Technology Stacks I Love and Use Proficiently'
					y={-20}
					once
				/>
				{sortedTech.map((technology: any, index: number) => (
					<div
						key={technology.id}
						className={
							styles[
								`${technology.tech_stack.toLowerCase().split(' ').join('-')}`
							]
						}
					>
						<AnimatedCharacter
							className={styles['tech-stack']}
							el='h3'
							text={technology.tech_stack}
							delay={index + 1}
							x={200}
							once
						/>
						<div className={styles['tech-stack-images']}>
							{technology.images.map((img: string, idx: number) => (
								<Reveal
									key={idx}
									el='div'
									x={100}
									once
									delay={idx / 2 + 0.1}
									duration={0.7}
								>
									<figure key={idx} className={styles.figure}>
										<Image
											src={`/images/technologies/${img}`}
											alt={technology.tech_stack}
											loading='eager'
											className={styles['tech-img']}
											width={120}
											height={90}
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
			<div className={styles.enquiry}>
				<AnimatedWord
					text='Get to know me better? Please do not hesitate to contact me'
					el='h3'
					delay={1}
					y={-20}
					once
				/>
				<motion.div whileHover={{ scale: 1.1 }}>
					<Link href={'/contact'} className={styles.contact}>
						{"Let's work together"}
					</Link>
				</motion.div>
			</div>
		</main>
	)
}
