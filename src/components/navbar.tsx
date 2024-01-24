'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from '../styles/navbar.module.css'
import 'bootswatch/dist/sandstone/bootstrap.min.css'

const Navbar = () => {
	const pathname = usePathname()
	const [toggleMenu, setToggleMenu] = useState(false)
	const [isChecked, setIsChecked] = useState(false)
	const [screenWidth, setScreenWidth] = useState(1348)

	const toggleNav = () => {
		setToggleMenu(!toggleMenu)
		setIsChecked(!isChecked)
	}

	function screenTest() {
		if (window.innerWidth <= 767) {
			toggleNav()
		}
	}

	useEffect(() => {
		const changeWidth = () => {
			setScreenWidth(window.innerWidth)
		}
		window.addEventListener('resize', changeWidth)
		return () => {
			window.removeEventListener('resize', changeWidth)
		}
	}, [])

	return (
		<header
			className={`${styles['custom-header']} navbar navbar-expand-md border-0 fixed-top`}
		>
			<div className='container-fluid'>
				<Link className='navbar-brand border-0 mx-4' href='/'>
					DB Freelancers
				</Link>
				<input
					id='menu__toggle'
					className={styles['menu__toggle']}
					type='checkbox'
					checked={isChecked}
					onChange={toggleNav}
				/>
				<label className={styles['menu__btn']} htmlFor='menu__toggle'>
					<span></span>
				</label>
				{(toggleMenu || screenWidth > 767) && (
					<nav className={`text-center me-auto me-md-5 ${styles['menu__box']}`}>
						<ul
							className={`navbar-nav ms-auto border-0  ${styles['menu__box__ul']}`}
						>
							<li className={`nav-item ${styles['custom-nav-item']}`}>
								<Link
									href='/'
									className={`nav-link p-3 border-end-0 ${
										pathname === '/' ? styles.active : styles['menu__item']
									}`}
									onClick={screenTest}
								>
									<span>Home</span>
								</Link>
							</li>
							<li className={`nav-item ${styles['custom-nav-item']}`}>
								<Link
									href='/services'
									className={`nav-link p-3 border-end-0 ${
										pathname === '/services'
											? styles.active
											: styles['menu__item']
									}`}
									onClick={screenTest}
								>
									<span>Services</span>
								</Link>
							</li>
							<li className={`nav-item ${styles['custom-nav-item']}`}>
								<Link
									href='/projects'
									className={`nav-link p-3 border-end-0 ${
										pathname === '/projects'
											? styles.active
											: styles['menu__item']
									}`}
									onClick={screenTest}
								>
									<span>Projects</span>
								</Link>
							</li>
							<li className={`nav-item ${styles['custom-nav-item']}`}>
								<Link
									href='/about'
									className={`nav-link p-3 border-end-0 ${
										pathname === '/about' ? styles.active : styles['menu__item']
									}`}
									onClick={screenTest}
								>
									<span>About</span>
								</Link>
							</li>
							<li className={`nav-item ${styles['custom-nav-item']}`}>
								<Link
									href='/contact'
									className={`nav-link p-3 ${
										pathname === '/contact'
											? styles.active
											: styles['menu__item']
									}`}
									onClick={screenTest}
								>
									<span>Contact</span>
								</Link>
							</li>
						</ul>
					</nav>
				)}
			</div>
		</header>
	)
}

export default Navbar
