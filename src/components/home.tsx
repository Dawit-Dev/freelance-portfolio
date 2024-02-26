'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Reveal from '@/animations/reveal'
import AnimatedCharacter from '../animations/char-animation'
import AnimatedWord from '../animations/word-animation'
import Link from 'next/link'
import Testimonials from './testimonials'
import { oswald, playfairDisplay, raleway, montserrat } from '@/styles/fonts'
import styles from '../styles/home.module.css'

type ProfileProps = {
	id: number
	title: string
	greetings: string
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

	const rightVariant = {
		visible: {
			opacity: 1,
			x: 0,
			transition: { type: 'spring', stiffness: 30, delay: 0.5, duration: 3 },
		},
		hidden: { opacity: 0, x: 100 },
	}

	return (
		<main className={styles.main}>
			<Reveal
				el='section'
				className={styles.hero}
				scale={0}
				type='spring'
				stiffness={30}
				delay={0.5}
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
				<div className={`${styles['overlay-text']} ${oswald.className}`}>
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
					/>
					<Reveal
						el='div'
						rotateX={180}
						delay={5}
						duration={2}
						type='spring'
						stiffness={30}
						// y={50}
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
					text={profile.greetings}
					el='h1'
					y={-20}
					delay={6}
					duration={1.5}
					rotateX={360}
					once
					className={`${styles.greetings} ${oswald.className}`}
				/>
				<Reveal el='div' y={40} delay={1} duration={2} amount={0.1} once>
					<div className={styles['intro-wrapper']}>
						{text.split('..').map((paragraph, index) => (
							<div key={index}>
								<p className={`${styles.intro} ${montserrat.className}`}>
									{paragraph + '.'}
								</p>
							</div>
						))}
					</div>
				</Reveal>
				<section>
					{profile.sub_titles.map((title: string, index: number) => (
						<div key={index}>
							<AnimatedCharacter
								text={title}
								el={'h3'}
								y={20}
								once
								delay={index / 2 + 0.5}
								amount={1}
								className={`${styles['sub-title']} ${playfairDisplay.className}`}
							/>
							<div className={styles.development}>
								<Reveal
									el='div'
									x={-100}
									type='spring'
									stiffness={30}
									delay={0.5}
									duration={3}
									once
								>
									<Image
										src={`/images/${profile.images[index]}`}
										alt={title}
										loading='eager'
										className={styles['tech-img']}
										width={340}
										height={240}
										sizes='(min-width: 300px) 100vw'
										placeholder='blur'
										blurDataURL={`/images/${profile.images[index]}`}
									/>
								</Reveal>
								<motion.div
									variants={rightVariant}
									initial='hidden'
									whileInView='visible'
									viewport={{ root: rightScrollRef, amount: 0.5, once: true }}
								>
									<AnimatedWord
										text={profile.description[index]}
										el='p'
										delay={0.5}
										y={150}
										x={100}
										rotateY={360}
										once
										className={`${styles.description} ${montserrat.className} ${
											title === 'Frontend'
												? styles.frontend
												: title === 'Backend'
												? styles.backend
												: styles['full-stack']
										}`}
									/>
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
