'use client'

import { motion } from 'framer-motion'

interface Props {
	children: JSX.Element | JSX.Element[] | string
	el?: keyof JSX.IntrinsicElements
	className?: string
	x?: number
	y?: number
	once?: boolean
}

export const Reveal = ({
	children,
	className,
	el: Wrapper = 'div',
	x,
	y,
	once,
}: Props) => {
	return (
		<Wrapper className={className}>
			<motion.div
				variants={{
					hidden: { opacity: 0, y: y },
					visible: { opacity: 1, y: 0 },
				}}
				initial='hidden'
				whileInView='visible'
				viewport={{amount: 0.5, once}}
				transition={{ duration: 2, delay: 0.5, type: 'spring', stiffness: 20 }}
			>
				{children}
			</motion.div>
		</Wrapper>
	)
}
