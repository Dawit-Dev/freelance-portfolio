'use client'

import { motion } from 'framer-motion'

type AnimatedWordProps = {
	text?: string
	el?: keyof JSX.IntrinsicElements
	className?: string
	once?: boolean
	amount?: number
	delay?: number
	duration?: number
	scale?: number
	y?: number
	x?: number
	rotateX?: number
	rotateY?: number
	opacity?: number
}

const AnimatedWord = ({
	text,
	el: Wrapper = 'h1',
	className,
	once,
	amount = 0.5,
	delay,
	duration = 1,
	scale,
	y,
	x,
	rotateX,
	rotateY,
	opacity = 0,
}: AnimatedWordProps) => {
	const textArray = Array.isArray(text) ? text : [text]

	const defaultAnimations = {
		hidden: { opacity, scale, x, y, rotateX, rotateY },
		visible: {
			opacity: 1,
			scale: 1,
			x: 0,
			y: 0,
			rotateX: 0,
			rotateY: 0,
			transition: { duration },
		},
	}

	return (
		<Wrapper className={className} key='animated-text'>
			<motion.span
				aria-hidden
				initial='hidden'
				whileInView='visible'
				viewport={{ amount, once }}
				transition={{ staggerChildren: 0.15, delayChildren: delay }}
			>
				{textArray.map((line, index) => (
					<span className='d-block' key={index}>
						{line.split(' ').map((word: string, index: number) => (
							<motion.span
								variants={defaultAnimations}
								className='d-inline-block'
								key={index}
							>
								{word}
								<span className='d-inline-block'>&nbsp;</span>
							</motion.span>
						))}
					</span>
				))}
			</motion.span>
		</Wrapper>
	)
}

export default AnimatedWord
