'use client'

import { motion } from 'framer-motion'

type AnimatedTextProps = {
	text?: string
	el?: keyof JSX.IntrinsicElements
	className?: string
	once?: boolean
	delay?: number
}

const defaultAnimations = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 1 } },
}

const AnimatedWord = ({
	text,
	el: Wrapper = 'h1',
	className,
	once,
	delay,
}: AnimatedTextProps) => {
	const textArray = Array.isArray(text) ? text : [text]

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
