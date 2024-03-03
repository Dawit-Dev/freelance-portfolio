'use client'

import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip'
import { oswald, playfairDisplay, raleway, montserrat } from '@/styles/fonts'
import styles from '../styles/about.module.css'

type FlipCardProps = {
	question: string
	answer: string
	id: number
}

function FlipCard({ question, answer, id }: FlipCardProps) {
	const [flip, setFlip] = useState(false)

	const onClickOutsideListener = () => {
		if (flip) setFlip(false)
		document.removeEventListener('click', onClickOutsideListener)
	}

	return (
		<div className={styles['flip-card-container']}>
			<ReactCardFlip
				isFlipped={flip}
				flipDirection='vertical'
				flipSpeedFrontToBack={1.5}
				flipSpeedBackToFront={1.5}
				infinite={true}
			>
				<div
					className={styles.question}
					onClick={() => setFlip(!flip)}
					onMouseLeave={() => {
						document.addEventListener('click', onClickOutsideListener)
					}}
				>
					<h4 className={raleway.className}>{question}</h4>
				</div>
				<div
					className={styles.answer}
					onClick={() => setFlip(!flip)}
					onMouseLeave={() => {
						document.addEventListener('click', onClickOutsideListener)
					}}
				>
					<h4 className={raleway.className}>{answer}</h4>
				</div>
			</ReactCardFlip>
		</div>
	)
}

export default FlipCard
