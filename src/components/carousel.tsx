import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faChevronCircleLeft,
	faChevronCircleRight,
	faQuoteLeft,
	faQuoteRight,
} from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import avatarImage from '../../public/images/avatar.jpg'
import { montserrat } from '@/styles/fonts'
import styles from '../styles/testimonials.module.css'
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

const Carousel = ({ testimonials }: { testimonials: TestimonialsProps[] }) => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [animate, setAnimate] = useState(false)

	const handleNext = () => {
		setCurrentIndex(prevIndex =>
			prevIndex + 1 === testimonials.length ? 0 : prevIndex + 1
		)
	}

	const handlePrevious = () => {
		setCurrentIndex(prevIndex =>
			prevIndex - 1 < 0 ? testimonials.length - 1 : prevIndex - 1
		)
	}

	const handleDotClick = (index: number) => {
		setCurrentIndex(index)
	}

	return (
		<div className={styles.carousel}>
			<Reveal
				el='div'
				y={100}
				delay={1}
				duration={1}
				amount={0.1}
				once
				startAnimation={animate}
			>
				<div className={styles['carousel-container']}>
					<div key={testimonials[currentIndex].id} className={styles.wrapper}>
						<div className={styles['image-container']}>
							<Image
								src={avatarImage}
								alt={testimonials[currentIndex].name}
								className={styles['testimonial-image']}
							/>
						</div>
						<div className={styles['testimonial-container']}>
							<p className={styles.testimonial}>
								<FontAwesomeIcon
									icon={faQuoteLeft}
									className={styles['fa-quote-left']}
									onClick={() => setAnimate(!animate)}
								/>{' '}
								&nbsp;
								{testimonials[currentIndex].testimony} &nbsp;
								<FontAwesomeIcon
									icon={faQuoteRight}
									className={styles['fa-quote-right']}
									onClick={() => setAnimate(!animate)}
								/>
							</p>
							<section
								className={`${styles['personal-info']} ${montserrat.className}`}
							>
								<p className={styles.info}>{testimonials[currentIndex].name}</p>
								<p className={styles.info}>
									{testimonials[currentIndex].company}
								</p>
								<p className={styles.info}>
									{testimonials[currentIndex].position}
								</p>
								<p className={styles.info}>
									{testimonials[currentIndex].address}
								</p>
							</section>
						</div>
					</div>
					<div className={styles['slide_direction']}>
						<div className={styles.left} onClick={handlePrevious}>
							<FontAwesomeIcon
								icon={faChevronCircleLeft}
								className={styles['fa-chevron']}
							/>
						</div>
						<div className={styles.right} onClick={handleNext}>
							<FontAwesomeIcon
								icon={faChevronCircleRight}
								className={styles['fa-chevron']}
							/>
						</div>
					</div>
				</div>
			</Reveal>
			<div className={styles['carousel-indicator']}>
				{testimonials.map((testimonial, index) => (
					<div
						key={testimonial.id}
						className={`${styles.dot} ${
							currentIndex === index ? styles.current : ''
						}`}
						onClick={() => handleDotClick(index)}
					></div>
				))}
			</div>
		</div>
	)
}
export default Carousel
