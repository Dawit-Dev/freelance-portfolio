"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import styles from "../styles/about.module.css";

type AboutProps = {
	id: number;
	title: string;
	bio: string;
	image: string;
};

export default function About({ id, title, bio, image }: AboutProps) {
	const pageVariant = {
		visible: {
			opacity: 1,
			transition: { type: "spring", stiffness: 30, delay: 0.5, duration: 2 },
		},
		hidden: { opacity: 0 },
	};

	return (
		<motion.main
			variants={pageVariant}
			initial="hidden"
			whileInView="visible"
			className={styles["about-main"]}
		>
			<h1>{title}</h1>
			<Image
				src={`/images/${image}`}
				alt={title}
				loading="eager"
				className={styles["about-img"]}
				width={340}
				height={240}
				sizes="(min-width: 300px) 100vw"
				placeholder="blur"
				blurDataURL={`/images/${image}`}
			/>
			<p>{bio}</p>
		</motion.main>
	);
}
