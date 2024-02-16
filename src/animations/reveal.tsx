'use client'

import { motion } from 'framer-motion'

interface RevealProps {
	children: JSX.Element | JSX.Element[]
	el?: keyof JSX.IntrinsicElements
	className?: string
	x?: number
	y?: number
	scale?: number
	delay?: number
	once?: boolean
	onClick?: () => void
	rotateY?: number
	amount?: number
	duration?: number
}

export default function Reveal({
	children,
	className,
	el: Wrapper = 'div',
	x,
	y,
	scale,
	once,
	delay,
	onClick,
	rotateY,
	amount = 0.5,
	duration,
}: RevealProps) {
	return (
		<Wrapper className={className}>
			<motion.div
				variants={{
					hidden: { opacity: 0, x, y, scale },
					visible: { opacity: 1, x: 0, y: 0, scale: 1, rotateY },
				}}
				initial='hidden'
				whileInView='visible'
				viewport={{ amount, once }}
				exit={{ opacity: 0, x: 0, y: 0 }}
				transition={{
					duration,
					type: 'spring',
					stiffness: 30,
					delay: delay,
					repeatDelay: 1,
					delayChildren: delay,
				}}
				onClick={onClick}
			>
				{children}
			</motion.div>
		</Wrapper>
	)
}
