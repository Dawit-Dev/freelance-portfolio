'use client'

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faPhoneVolume,
	faEnvelope,
	faMapLocationDot,
	faCopyright,
} from '@fortawesome/free-solid-svg-icons'
import {
	faGithub,
	faSquareGithub,
	faLinkedin,
	faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import styles from '../styles/footer.module.css'

type ContactProps = {
	id: number
	post: string
	email: string
	phone: string
	social_media: string[]
}

const Footer = ({ contact }: { contact: ContactProps }) => {
	if (!contact) return <p>Loading</p>

	return (
		<main className={styles['footer-main']}>
			<div className={styles['nav-and-connect']}>
				<div className={styles['navigation-links']}>
					<h6 className={styles['footer-sub-title']}>Site Navigation:</h6>
					<div className={styles['nav-links']}>
						<Link href={'/'} className={styles['nav-link']}>
							Home
						</Link>
						<Link href={'/services'} className={styles['nav-link']}>
							Services
						</Link>
						<Link href={'/projects'} className={styles['nav-link']}>
							Projects
						</Link>
						<Link href={'/about'} className={styles['nav-link']}>
							About
						</Link>
						<Link href={'/contact'} className={styles['nav-link']}>
							Contact
						</Link>
					</div>
				</div>
				<div className={styles.connect}>
					<h6 className={styles['footer-sub-title']}>Connect with me on:</h6>
					<div className={styles.brands}>
						<a
							href={contact.social_media[0]}
							target='_blank'
							rel='noreferrer'
							className={styles.anchor}
						>
							<FontAwesomeIcon
								icon={faGithub}
								className={styles.github}
								size='2xl'
							/>
						</a>
						<a href={contact.social_media[1]} target='_blank' rel='noreferrer'>
							<FontAwesomeIcon
								icon={faLinkedinIn}
								className={styles.linkedin}
								size='2xl'
							/>
						</a>
					</div>
				</div>
			</div>
			<div className={styles['contact-info']}>
				<h6 className={styles['footer-sub-title']}>More contact options:</h6>
				<div>
					<p>
						<FontAwesomeIcon icon={faEnvelope} className={styles.email} />{' '}
						&nbsp; {contact.email}
					</p>
					<p>
						<FontAwesomeIcon
							icon={faMapLocationDot}
							className={styles.location}
						/>{' '}
						&nbsp; {contact.post}
					</p>
					<p>
						<FontAwesomeIcon icon={faPhoneVolume} className={styles.phone} />{' '}
						&nbsp; {contact.phone}
					</p>
					<p className={styles.copyright}>
						Copyright <FontAwesomeIcon icon={faCopyright} /> 2024, DB Freelance Developer Ltd.
					</p>
				</div>
			</div>
		</main>
	)
}

export default Footer
