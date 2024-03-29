'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import AnimatedCharacter from '../animations/char-animation'
import AnimatedWord from '../animations/word-animation'
import Reveal from '@/animations/reveal'
import FlipCard from './flip-card'
import { raleway, playfairDisplay, montserrat } from '@/styles/fonts'
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

	const wrapSpanInParagraph = (
		text: string,
		regex: RegExp,
		languages: RegExp
	) => {
		if (regex.test(text)) {
			const textArray = text.split(regex)
			return (
				<p>
					{textArray[0]}
					<span className={`${styles['my-name']} ${raleway.className}`}>
						{regex.toString().replaceAll('/', '')}
					</span>
					{textArray[1]}
				</p>
			)
		} else if (languages.test(text)) {
			const textArray = text.split(languages)
			return (
				<p>
					{textArray[0]}
					<span className={styles.languages}>
						{languages.toString().replaceAll('/', '')}
					</span>
					{textArray[1]}
				</p>
			)
		}

		return <p>{text}</p>
	}

	return (
		<main className={styles['about-main']}>
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
					{about.title.split('.').map((title, index) => (
						<div key={index}>
							<AnimatedWord
								el={index === 0 ? 'h3' : 'p'}
								text={index === 0 ? title + '.' : title}
								once
								y={50}
								rotateY={180}
								rotateX={180}
								delay={0.5 + index}
								duration={1}
								className={
									index === 0
										? `${styles['sub-title']} ${raleway.className}`
										: `${styles.remark} ${raleway.className}`
								}
							/>
						</div>
					))}
				</div>
			</div>
			<AnimatedCharacter
				text='About Me'
				className={`${styles.title} ${raleway.className}`}
				el={'h1'}
				y={-20}
				stagger={0.075}
				once
				delay={1}
			/>
			<section className={styles['bio-wrapper']}>
				{about.bio.split(':').map((paragraph, index) => (
					<Reveal
						key={index}
						el='div'
						y={40}
						amount={0.2}
						duration={1.5}
						delay={index + 1}
						once
						className={`${styles.bio} ${montserrat.className}`}
					>
						{wrapSpanInParagraph(
							paragraph,
							/Dawit Abraha/,
							/HTML, CSS, JavaScript, Node.js, React, Next, PostgreSQL, Python, Flask and Django/
						)}
					</Reveal>
				))}
			</section>
			<AnimatedWord
				el='h3'
				text='Click the Questions to Reveal their Answers'
				once
				y={-20}
				className={`${styles.click} ${playfairDisplay.className}`}
			/>
			<section
				className={`${styles['questions-container']} ${montserrat.className}`}
			>
				{about.questions.map((question, index) => (
					<Reveal
						el='div'
						scale={0}
						delay={index / 2}
						duration={1.25}
						once
						amount={0.1}
						key={about.id}
						className={raleway.className}
					>
						<FlipCard question={question} answer={about.answers[index]} />
					</Reveal>
				))}
			</section>
			<section className={styles['tech-stacks']}>
				<AnimatedWord
					el='h3'
					className={playfairDisplay.className}
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
							className={`${styles['tech-stack']} ${playfairDisplay.className}`}
							el='h3'
							text={technology.tech_stack}
							delay={index + 1}
							x={200}
							stagger={0.078}
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
										<figcaption className={montserrat.className}>
											{technology.labels[idx]}
										</figcaption>
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
					className={raleway.className}
					delay={1}
					y={-20}
					once
				/>
				<motion.div whileHover={{ scale: 1.1 }}>
					<Link
						href={'/contact'}
						className={`${styles.contact} ${raleway.className}`}
					>
						{"Let's work together"}
					</Link>
				</motion.div>
			</div>
		</main>
	)
}
