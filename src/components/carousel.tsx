import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faChevronCircleLeft,
	faChevronCircleRight,
	faQuoteLeft,
	faQuoteRight,
} from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import avatarImage from '../../public/images/avatar.jpg'
import { playfairDisplay, montserrat } from '@/styles/fonts'
import styles from '../styles/testimonials.module.css'

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

	const handleNext = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex + 1 === testimonials.length ? 0 : prevIndex + 1
		)
	}

	const handlePrevious = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex - 1 < 0 ? testimonials.length - 1 : prevIndex - 1
		)
	}

	const handleDotClick = (index: number) => {
		setCurrentIndex(index)
	}

	return (
		<div className={styles.carousel}>
			<div className={styles['carousel-images']}>
				<div>
					<div className={styles['image-wrapper']} key={'carousel'}>
						<div key={testimonials[currentIndex].id} className={styles.wrapper}>
							<div className={styles['image-container']}>
								<Image
									src={avatarImage}
									alt={testimonials[currentIndex].name}
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
									{testimonials[currentIndex].testimony} &nbsp;
									<FontAwesomeIcon
										icon={faQuoteRight}
										className={styles['fa-quote-right']}
									/>
								</h4>
								<section
									className={`${styles['personal-info']} ${montserrat.className}`}
								>
									<h5 className={styles.info}>
										{testimonials[currentIndex].name}
									</h5>
									<h5 className={styles.info}>
										{testimonials[currentIndex].company}
									</h5>
									<h5 className={styles.info}>
										{testimonials[currentIndex].position}
									</h5>
									<h5 className={styles.info}>
										{testimonials[currentIndex].address}
									</h5>
								</section>
							</div>
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
			</div>
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
