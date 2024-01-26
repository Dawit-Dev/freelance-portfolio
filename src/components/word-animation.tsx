'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

type AnimatedTextProps = {
	text?: string
	el?: keyof JSX.IntrinsicElements
	className?: string
	once?: boolean
}

const defaultAnimations = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const AnimatedWord = ({
	text,
	el: Wrapper = 'h1',
	className,
	once,
}: AnimatedTextProps) => {
	const textArray = Array.isArray(text) ? text : [text]
	const ref = useRef(null)
	const isInView = useInView(ref, { amount: 0.2, once })

	return (
		<Wrapper className={className} key='animated-text'>
			<motion.span
				aria-hidden
				ref={ref}
				initial='hidden'
				animate={isInView ? 'visible' : 'hidden'}
				transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
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
