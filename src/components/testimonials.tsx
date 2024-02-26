'use client'

import { useState } from 'react'
import AnimatedWord from '@/animations/word-animation'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Reveal from '@/animations/reveal'
import { playfairDisplay, montserrat } from '@/styles/fonts'
import styles from '@/styles/testimonials.module.css'
import Carousel from './carousel'
import AnimatedCharacter from '@/animations/char-animation'

type TestimonialsProps = {
	id: number
	name: string
	company: string
	address: string
	position: string
	testimony: string
	image: string
}

export default function Testimonials({
	testimonials,
}: {
	testimonials: TestimonialsProps[]
}) {
	const [animate, setAnimate] = useState(false)
	return (
		<Reveal el='main' y={200} delay={0.5} duration={1} once amount={0.2}>
			<Reveal
				el='section'
				y={200}
				delay={1}
				duration={1}
				once
				amount={0.2}
				className={styles['testimonials-main']}
			>
				<div>
					<AnimatedWord
						className={`${styles.title} ${playfairDisplay.className}`}
						el='h3'
						text='Testimonials about my services and software products'
						y={-20}
						// scale={1}
						// x={50}
						delay={2}
						duration={1}
						once
					/>
					<Carousel testimonials={testimonials} />
				</div>
			</Reveal>
		</Reveal>
	)
}
