'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import frontendImage from '../../public/images/frontend.png'
import backendImage from '../../public/images/backend.jpg'
import fullstackImage from '../../public/images/full-stack.png'
import Reveal from '@/animations/reveal'
import AnimatedCharacter from '../animations/char-animation'
import Link from 'next/link'
import Testimonials from './testimonials'
import { raleway, playfairDisplay, montserrat } from '@/styles/fonts'
import styles from '../styles/home.module.css'

type ProfileProps = {
	id: number
	title: string
	greetings: string | null
	intro: string | null
	sub_titles: string[]
	images: string[]
	description: string[]
}

type TestimonialsProps = {
	id: number
	name: string
	company: string
	address: string
	position: string
	testimony: string
	image: string
}

export default function Home({
	profile,
	testimonials,
}: {
	profile: ProfileProps
	testimonials: TestimonialsProps[]
}) {
	const rightScrollRef = useRef(null)
	const text: string = profile.intro!
	const greetings: string = profile.greetings!

	const leftVariant = {
		visible: {
			opacity: 1,
			x: 0,
			transition: { type: 'spring', stiffness: 20, delay: 0.5, duration: 3 },
		},
		hidden: { opacity: 0, x: -100 },
	}

	const rightVariant = {
		visible: {
			opacity: 1,
			x: 0,
			transition: { type: 'spring', stiffness: 20, delay: 0.5, duration: 3 },
		},
		hidden: { opacity: 0, x: 100 },
	}

	const wrapSpanInParagraph = (text: string, regex: RegExp) => {
		const textArray = text.split(regex)
		if (regex.test(text)) {
			return (
				<p>
					{textArray[0]}
					<span key={'key'} className={styles.highlight}>
						{regex.toString().replaceAll('/', '')}
					</span>
					{textArray[1] + '.'}
				</p>
			)
		}

		return text + '.'
	}

	return (
		<main className={styles.main}>
			<Reveal
				el='section'
				className={styles.hero}
				scale={0}
				type='spring'
				stiffness={20}
				delay={0.2}
				duration={2}
				once
			>
				<Image
					src={'/images/hero-bg.jpg'}
					alt={profile.title}
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
					alt={profile.title}
					loading='eager'
					className={styles['lg-bg-img']}
					width={340}
					height={240}
					sizes='(min-width: 300px) 100vw'
					placeholder='blur'
					blurDataURL={'hero-bg.jpg'}
				/>
				<div className={`${styles['overlay-text']} ${raleway.className}`}>
					<AnimatedCharacter
						text={profile.title}
						className={`${styles.title}`}
						el={'h1'}
						scale={1.1}
						once
						delay={2}
						rotateX={180}
						opacity={1}
						duration={1}
						stagger={0.035}
					/>
					<Reveal
						el='div'
						rotateX={180}
						delay={5}
						duration={2}
						type='spring'
						stiffness={30}
						once
					>
						<div className={`${styles['links-wrapper']} ${raleway.className}`}>
							<Link href={'/services'} className={`${styles.link}`}>
								Services
							</Link>
							<Link href={'/projects'} className={`${styles.link}`}>
								Projects
							</Link>
						</div>
					</Reveal>
				</div>
			</Reveal>
			<div className={styles.wrapper}>
				<AnimatedCharacter
					text={greetings}
					el='h1'
					y={-20}
					delay={6}
					duration={1.5}
					rotateX={360}
					stagger={0.05}
					once
					className={`${styles.greetings} ${raleway.className}`}
				/>
				<div className={styles['intro-wrapper']}>
					{text.split(':').map((paragraph, index) => (
						<Reveal
							key={index}
							el='div'
							y={40}
							delay={1 + index}
							duration={2}
							amount={0.1}
							once
						>
							<div
								key={index}
								className={`${styles.intro} ${montserrat.className}`}
							>
								{wrapSpanInParagraph(
									paragraph,
									/you and I can make a great team!/
								)}
							</div>
						</Reveal>
					))}
				</div>
				<section>
					{profile.sub_titles.map((title: string, index: number) => (
						<div key={index}>
							<AnimatedCharacter
								text={title}
								el={'h3'}
								y={20}
								once
								stagger={0.14}
								delay={index / 2 + 0.5}
								amount={1}
								className={`${styles['sub-title']} ${playfairDisplay.className}`}
							/>
							<div className={styles.development}>
								<motion.div
									className={`${styles['tech-img-container']} ${
										title === 'Frontend'
											? styles['frontend-img-bg']
											: title === 'Backend'
											? styles['backend-img-bg']
											: styles['full-stack-img-bg']
									}`}
									variants={leftVariant}
									initial='hidden'
									whileInView='visible'
									viewport={{ root: rightScrollRef, amount: 0.5, once: true }}
								>
									<Image
										src={
											profile.images[index] === 'frontend.png'
												? frontendImage
												: profile.images[index] === 'backend.jpg'
												? backendImage
												: profile.images[index] === 'full-stack.png'
												? fullstackImage
												: ''
										}
										alt={title}
										loading='eager'
										className={styles['tech-img']}
									/>
								</motion.div>
								<motion.div
									className={`${styles['description-wrapper']} ${
										title === 'Frontend'
											? styles.frontend
											: title === 'Backend'
											? styles.backend
											: styles['full-stack']
									}`}
									variants={rightVariant}
									initial='hidden'
									whileInView='visible'
									viewport={{ root: rightScrollRef, amount: 0.5, once: true }}
								>
									{profile.description[index]
										.split(':')
										.map((description, index) => (
											<Reveal
												key={index}
												el='div'
												delay={index === 0 ? 2 : index + 2}
												x={40}
												duration={1}
												once
											>
												<p
													className={`${styles.description} ${montserrat.className} `}
												>
													{description}
												</p>
											</Reveal>
										))}
								</motion.div>
							</div>
						</div>
					))}
				</section>
			</div>
			<Testimonials testimonials={testimonials} />
			<Reveal
				el='div'
				delay={0.5}
				duration={1}
				scale={0}
				className={styles['action-btn-wrapper']}
				once
			>
				<motion.div whileHover={{ scale: 1.1 }}>
					<Link
						href={'/services'}
						className={`${styles['action-btn']} ${raleway.className}`}
					>
						Check out My Services
					</Link>
				</motion.div>
			</Reveal>
		</main>
	)
}
