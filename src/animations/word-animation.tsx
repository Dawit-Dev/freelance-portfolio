'use client'

import { motion } from 'framer-motion'

type AnimatedWordProps = {
	text?: string
	el?: keyof JSX.IntrinsicElements
	className?: string
	once?: boolean
	delay?: number
	scale?: number
	y?: number
	x?: number
}

const AnimatedWord = ({
	text,
	el: Wrapper = 'h1',
	className,
	once,
	delay,
	scale,
	y,
	x,
}: AnimatedWordProps) => {
	const textArray = Array.isArray(text) ? text : [text]

	const defaultAnimations = {
		hidden: { opacity: 0, scale, x, y },
		visible: { opacity: 1, scale: 1, x: 0, y: 0, transition: { duration: 1 } },
	}

	return (
		<Wrapper className={className} key='animated-text'>
			<motion.span
				aria-hidden
				initial='hidden'
				whileInView='visible'
				viewport={{ amount: 0.5, once }}
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
