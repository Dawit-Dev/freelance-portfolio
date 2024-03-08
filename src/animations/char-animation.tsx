'use client'

import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { clearTimeout } from 'timers'

type AnimatedCharacterProps = {
	text: string
	el?: keyof JSX.IntrinsicElements
	className?: string
	opacity?: number
	scale?: number
	x?: number
	y?: number
	once?: boolean
	amount?: number
	delay?: number
	duration?: number
	repeatInterval?: number
	delayTimeout?: number
	rotateX?: number
	rotateY?: number
	stagger?: number
}

const AnimatedCharacter = ({
	text,
	el: Wrapper = 'h1',
	className,
	opacity = 0,
	scale,
	x,
	y,
	once,
	amount = 0.5,
	delay,
	duration = 0.3,
	repeatInterval,
	delayTimeout,
	rotateX,
	rotateY,
	stagger = 0.035,
}: AnimatedCharacterProps) => {
	const textArray = Array.isArray(text) ? text : [text]
	const controls = useAnimation()
	const ref = useRef(null)
	const isInView = useInView(ref, { amount, once })

	useEffect(() => {
		let interval: NodeJS.Timeout
		let timeout: NodeJS.Timeout
		const show = () => {
			controls.start('visible')
			if (repeatInterval) {
				interval = setInterval(async () => {
					await controls.start('hidden')
					controls.start('visible')
				}, repeatInterval)
			}
		}

		const startAnimation = () => {
			controls.start('visible')
			if (delayTimeout) {
				timeout = setTimeout(async () => {
					await controls.start('hidden')
					controls.start('visible')
				}, delayTimeout)
			}
		}

		if (isInView) {
			show()
			startAnimation()
		} else controls.start('hidden')

		return () => {
			clearInterval(interval)
			clearTimeout(timeout)
		}
	}, [isInView, controls, repeatInterval, delayTimeout])

	return (
		<Wrapper className={className} key='animated-text'>
			<motion.span
				aria-hidden
				ref={ref}
				initial={'hidden'}
				animate={controls}
				variants={{
					hidden: {},
					visible: {
						transition: { staggerChildren: stagger, delayChildren: delay },
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

export default AnimatedCharacter
