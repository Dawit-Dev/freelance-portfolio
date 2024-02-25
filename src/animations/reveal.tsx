'use client'

import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface RevealProps {
	children: JSX.Element | JSX.Element[]
	el?: keyof JSX.IntrinsicElements
	className?: string
	opacity?: number
	x?: number
	y?: number
	scale?: number
	delay?: number
	once?: boolean
	amount?: number
	onClick?: () => void
	rotateX?: number
	rotateY?: number
	duration?: number
	type?: string
	stiffness?: number
	startAnimation?: boolean
}

export default function Reveal({
	children,
	className,
	el: Wrapper = 'div',
	opacity = 0,
	x,
	y,
	scale,
	once,
	delay,
	onClick,
	rotateX,
	rotateY,
	amount = 0.5,
	duration = 0.3,
	type,
	stiffness,
	startAnimation,
}: RevealProps) {
	const controls = useAnimation()
	const ref = useRef(null)
	const isInView = useInView(ref, { amount, once })

	useEffect(() => {
		let timeout: NodeJS.Timeout

		const start = () => {
			controls.start('visible')
			if (startAnimation) {
				timeout = setTimeout(async () => {
					await controls.start('hidden')
					controls.start('visible')
				}, 1000)
			}
		}

		if (isInView) {
			start()
		} else controls.start('hidden')

		return () => {
			clearTimeout(timeout)
		}
	}, [isInView, controls, startAnimation])

	return (
		<Wrapper className={className}>
			<motion.div
				variants={{
					hidden: { opacity, x, y, scale, rotateX, rotateY },
					visible: { opacity: 1, x: 0, y: 0, scale: 1, rotateX: 0, rotateY: 0 },
				}}
				ref={ref}
				initial='hidden'
				// whileInView='visible'
				animate={controls}
				viewport={{ amount, once }}
				exit={{ opacity: 0, x: 0, y: 0 }}
				transition={{
					duration,
					type,
					stiffness,
					delay,
					delayChildren: delay,
				}}
				onClick={onClick}
			>
				{children}
			</motion.div>
		</Wrapper>
	)
}
