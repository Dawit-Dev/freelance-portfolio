'use client'

import Image from 'next/image'
import avatarImage from '../../public/images/avatar.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import { config } from '@fortawesome/fontawesome-svg-core'
import AnimatedWord from '@/animations/word-animation'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import styles from '@/styles/testimonials.module.css'
import Reveal from '@/animations/reveal'

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
						className={styles.title}
						el='h3'
						text="Here's a testimonial about my service and software product"
						// y={20}
						// scale={1}
						x={50}
						delay={2}
						once
					/>
					{testimonials.map(testimonial => (
						<div key={testimonial.id} className={styles.wrapper}>
							<div className={styles['image-container']}>
								<Image
									src={avatarImage}
									alt={testimonial.name}
									className={styles['testimonial-image']}
								/>
							</div>
							<div className={styles['testimonial-container']}>
								<h4 className={styles.testimonial}>
									<FontAwesomeIcon
										icon={faQuoteLeft}
										className={styles['fa-quote-left']}
									/>{' '}
									&nbsp;
									{testimonial.testimony} &nbsp;
									<FontAwesomeIcon
										icon={faQuoteRight}
										className={styles['fa-quote-right']}
									/>
								</h4>
								<section className={styles['personal-info']}>
									<h5 className={styles.info}>{testimonial.name}</h5>
									<h5 className={styles.info}>{testimonial.company}</h5>
									<h5 className={styles.info}>{testimonial.position}</h5>
									<h5 className={styles.info}>{testimonial.address}</h5>
								</section>
							</div>
						</div>
					))}
				</div>
			</Reveal>
		</Reveal>
	)
}
