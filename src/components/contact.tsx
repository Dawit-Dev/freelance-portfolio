"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import styles from "../styles/contact.module.css";

export default function Contact() {
	const ref = useRef(null);

	const pageVariant = {
		visible: {
			opacity: 1,
			transition: { type: "spring", stiffness: 30, delay: 0.5, duration: 2 },
		},
		hidden: { opacity: 0 },
	};

	return (
		<motion.main
			ref={ref}
			variants={pageVariant}
			initial="hidden"
			whileInView="visible"
			className={styles["contact-main"]}
		>
			<h1>Contact Page</h1>
		</motion.main>
	);
}
