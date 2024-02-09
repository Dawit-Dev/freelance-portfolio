'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faPaperPlane,
	faPhoneVolume,
	faEnvelope,
	faMapLocationDot,
} from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import { ThemeProvider, createTheme } from '@mui/material/styles'
export const theme = createTheme({
	components: {
		MuiFormLabel: {
			styleOverrides: {
				asterisk: {
					color: '#db3131',
					'&$error': {
						color: '#db3131',
					},
				},
			},
		},
	},
})

import styles from '../styles/contact.module.css'

type ErrorProps = {
	name: boolean
	email: boolean | object | any
	subject: boolean
	message: boolean
}

export default function Contact() {
	const [formInputs, setFormInputs] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	})
	//   Form validation state
	const [errors, setErrors] = useState<ErrorProps>({
		name: true,
		email: true,
		subject: true,
		message: true,
	})
	const [buttonText, setButtonText] = useState('Send')
	const [showSuccessMessage, setShowSuccessMessage] = useState(false)

	const handleChange = (e: any) => {
		setFormInputs(values => ({
			...values,
			[e.target.name]: e.target.value,
		}))
		setErrors(values => ({
			...values,
			[e.target.name]: false,
		}))
	}

	const isEmail = (email: string) =>
		/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)

	const formValidator = () => {
		let tempErrors: object | any = {}
		let isValid = true
		if (!formInputs.name) {
			tempErrors['name'] = true
			isValid = false
		}
		if (!formInputs.email) {
			tempErrors['email'] = {
				isError: true,
				errorMessage: 'Email is required',
			}
			isValid = false
		} else if (!isEmail(formInputs.email)) {
			tempErrors['email'] = {
				isError: true,
				errorMessage: 'Invalid email!',
			}
			isValid = false
		}
		if (!formInputs.subject) {
			tempErrors['subject'] = true
			isValid = false
		}
		if (!formInputs.message) {
			tempErrors['message'] = true
			isValid = false
		}

		setErrors({ ...tempErrors })
		return isValid
	}

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		let isValid = formValidator()
		if (!isValid) {
			return
		}

		const response = await fetch('/api', {
			method: 'POST',
			body: JSON.stringify(formInputs),
			headers: {
				'Content-Type': 'application/json',
			},
		})

		const res = await response.json()

		if (res.error) {
			console.log(res.error, '<------ error')
			setShowSuccessMessage(false)
			setButtonText('Send')
			return
		} else console.log(res)
		setFormInputs({
			name: '',
			email: '',
			subject: '',
			message: '',
		})
		setShowSuccessMessage(true)
		setButtonText('Send')
	}

	const pageVariant = {
		visible: {
			opacity: 1,
			transition: { type: 'spring', stiffness: 30, delay: 0.5, duration: 2 },
		},
		hidden: { opacity: 0 },
	}

	return (
		<motion.main
			variants={pageVariant}
			initial='hidden'
			whileInView='visible'
			className={styles['contact-main']}
		>
			<ThemeProvider theme={theme}>
				<Box
					className={styles.box}
					component='form'
					sx={{
						'& .MuiTextField-root': {
							m: 1,
							width: '100%',
						},
					}}
					noValidate
					autoComplete='off'
				>
					<div className={styles['text-fields']}>
						<TextField
							className={styles.textField}
							required
							label='Name'
							variant='filled'
							name='name'
							value={formInputs.name}
							onChange={handleChange}
							error={errors.name}
							helperText={
								errors['name'] ? 'Name is required' : 'Please enter your name'
							}
							InputProps={{ disableUnderline: true }}
							sx={{
								'& .MuiFormHelperText-root': {
									color: 'var(--helper-text-color)',
									fontSize: '14px',
									fontWeight: '400',
								},
							}}
						/>
						<TextField
							className={styles.textField}
							required
							label='Email'
							variant='filled'
							name='email'
							value={formInputs.email}
							onChange={handleChange}
							error={errors.email}
							helperText={
								errors['email']
									? errors.email.errorMessage
									: 'Please enter your email'
							}
							InputProps={{ disableUnderline: true }}
							sx={{
								'& .MuiFormHelperText-root': {
									color: 'var(--helper-text-color)',
									fontSize: '14px',
									fontWeight: '400',
								},
							}}
						/>
						<TextField
							className={styles.textField}
							label='Subject'
							variant='filled'
							name='subject'
							value={formInputs.subject}
							onChange={handleChange}
							helperText='Please enter the subject'
							InputProps={{ disableUnderline: true }}
							sx={{
								'& .MuiFormHelperText-root': {
									color: 'var(--helper-text-color)',
									fontSize: '14px',
									fontWeight: '400',
								},
							}}
						/>
					</div>
					<div className={styles['message-wrapper']}>
						<TextField
							required
							className={`${styles.message} ${styles.textField}`}
							label='Message'
							variant='filled'
							multiline
							minRows={5}
							maxRows={10}
							name='message'
							value={formInputs.message}
							onChange={handleChange}
							error={errors.message}
							helperText={
								errors['message']
									? 'Message is required'
									: 'Please enter your message'
							}
							InputProps={{ disableUnderline: true }}
							sx={{
								'& .MuiFormHelperText-root': {
									color: 'var(--helper-text-color)',
									fontSize: '14px',
									fontWeight: '400',
								},
								'& .Mui-error': {
									color: '#f44336',
								},
								'& .MuiInputBase-root': {
									color: 'var(--primary-text-color)',
									borderBottom: '1px solid var(--primary-text-color)',
								},
							}}
						/>
					</div>
					<br />
					<div className={styles['btn-container']}>
						<button onClick={handleSubmit} className={`btn ${styles.send}`}>
							{buttonText} &nbsp;
							<FontAwesomeIcon
								icon={faPaperPlane}
								className={styles['fa-paper-plane']}
							/>
						</button>
					</div>
				</Box>
			</ThemeProvider>
		</motion.main>
	)
}
