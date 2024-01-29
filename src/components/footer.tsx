"use client"

import Link from 'next/link';
import styles from '../styles/footer.module.css'

const Footer = () => {
	return (
		<main className={styles["footer-main"]}>
			<div className={styles["navigation-links"]}>
				<h4>Site Navigation:</h4>
				<Link href={"/"} className={styles["nav-link"]}>Home</Link>
				<Link href={"/services"} className={styles["nav-link"]}>Services</Link>
				<Link href={"/projects"} className={styles["nav-link"]}>Projects</Link>
				<Link href={"/about"} className={styles["nav-link"]}>About</Link>
				<Link href={"/contact"} className={styles["nav-link"]}>Contact</Link>
			</div>
			<div className={styles["social-media-links"]}></div>
		</main>
	);
}

export default Footer
