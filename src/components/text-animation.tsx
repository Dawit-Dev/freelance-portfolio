'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

type AnimatedTextProps = {
	text?: string
	longText?: string
	el?: keyof JSX.IntrinsicElements
	className?: string
	once?: boolean
}

const defaultAnimations = {
	hidden: { opacity: 0, scale: 3, y: 200 },
	visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
}

const AnimatedText = ({
	text,
	el: Wrapper = 'h1',
	className,
	once,
}: AnimatedTextProps) => {
	const textArray = Array.isArray(text) ? text : [text]
	const ref = useRef(null)
	const isInView = useInView(ref, { amount: 0.5, once })

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
							<span className='d-inline-block' key={index}>
								{word.split('').map((char, index) => (
									<motion.span
										className='d-inline-block'
										variants={defaultAnimations}
										key={index}
									>
										{char}
									</motion.span>
								))}
								<span className='d-inline-block'>&nbsp;</span>
							</span>
						))}
					</span>
				))}
			</motion.span>
		</Wrapper>
	)
}

export default AnimatedText
