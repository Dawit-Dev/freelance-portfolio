'use client'

import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'

type AnimatedTextProps = {
	text: string
	el?: keyof JSX.IntrinsicElements
	className?: string
	scale?: number
	x?: number
	y?: number
	once?: boolean
	delay?: number
	duration?: number
	repeatInterval?: number
}

const AnimatedText = ({
	text,
	el: Wrapper = 'h1',
	className,
	scale,
	x,
	y,
	once,
	delay,
	duration,
	repeatInterval,
}: AnimatedTextProps) => {
	const textArray = Array.isArray(text) ? text : [text]
	const controls = useAnimation()
	const ref = useRef(null)
	const isInView = useInView(ref, { amount: 0.5, once })

	useEffect(() => {
		let interval: NodeJS.Timeout
		const show = () => {
			controls.start('visible')
			if (repeatInterval) {
				interval = setInterval(async () => {
					await controls.start('hidden')
					controls.start('visible')
				}, repeatInterval)
			}
		}

		if (isInView) show()
		else controls.start('hidden')

		return () => clearInterval(interval)
	}, [isInView, controls, repeatInterval])

	return (
		<Wrapper className={className} key='animated-text'>
			<motion.span
				aria-hidden
				ref={ref}
				initial='hidden'
				animate={controls}
				variants={{
					hidden: {},
					visible: {
						transition: { staggerChildren: 0.15, delayChildren: delay },
					},
				}}
			>
				{textArray.map((line: string, index: number) => (
					<span className='d-block' key={index}>
						{line.split(' ').map((word: string, index: number) => (
							<span className='d-inline-block' key={index}>
								{word.split('').map((char: string, index: number) => (
									<motion.span
										className='d-inline-block'
										variants={{
											hidden: { opacity: 0, scale: scale, x: x, y: y },
											visible: {
												opacity: 1,
												scale: 1,
												x: 0,
												y: 0,
												transition: { duration: 0.3 },
											},
										}}
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
