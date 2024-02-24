'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import { useRouter } from 'next/navigation'
import AnimatedCharacter from '@/animations/char-animation'
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

import { oswald, raleway } from '@/styles/fonts'
import styles from '../styles/contact.module.css'

type InputProps = {
	name: string
	email: string
	subject: string
	message: string
}

type ErrorProps = {
	name: boolean
	email: boolean | object | any
	message: boolean
}

export default function Contact() {
	const router = useRouter()
	const [formInputs, setFormInputs] = useState<InputProps>({
		name: '',
		email: '',
		subject: '',
		message: '',
	})
	//   Form validation state
	const [name, setName] = useState('')
	const [errors, setErrors] = useState<ErrorProps>({
		name: true,
		email: true,
		message: true,
	})
	const [buttonText, setButtonText] = useState('Send')
	const [showSuccessMessage, setShowSuccessMessage] = useState(false)
	const [showError, setShowError] = useState(false)

	const handleChange = (e: any) => {
		setFormInputs(values => ({
			...values,
			[e.target.name]: e.target.value,
		}))
		setName(formInputs.name)
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
			setShowError(true)
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
			console.log(res.error)
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
		setTimeout(() => {
			setShowSuccessMessage(false)
			router.push('/')
		}, 7000)
	}

	return (
		<main className={styles['contact-main']}>
			<AnimatedCharacter
				text={
					formInputs.name ||
					formInputs.email ||
					formInputs.subject ||
					formInputs.message ||
					showSuccessMessage
						? 'Thank you for getting in touch!'
						: 'Contact me'
				}
				el='h3'
				className={`${oswald.className}`}
				y={20}
				delay={1}
				scale={0}
				repeatInterval={
					formInputs.name ||
					formInputs.email ||
					formInputs.subject ||
					formInputs.message ||
					showSuccessMessage
						? 8000
						: 4000
				}
			/>
			<ThemeProvider theme={theme}>
				<Box
					className={styles.box}
					component='form'
					sx={{
						'& .MuiTextField-root': {
							m: 'auto',
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
							error={showError && errors.name}
							helperText={
								errors['name'] && showError
									? 'Name is required'
									: 'Please enter your name'
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
							error={showError && errors.email}
							helperText={
								errors['email'] && showError
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
							label='Subject (optional)'
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
							error={showError && errors.message}
							helperText={
								errors['message'] && showError
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
						<motion.button
							onClick={handleSubmit}
							className={`${styles.send} ${raleway.className}`}
							whileHover={{ scale: 1.1 }}
						>
							{buttonText} &nbsp;
							<FontAwesomeIcon
								icon={faPaperPlane}
								className={styles['fa-paper-plane']}
							/>
						</motion.button>
					</div>
				</Box>
			</ThemeProvider>
			{showSuccessMessage && (
				<div className={styles['overlay-alert']}>
					<Alert severity='success' className={styles.success}>
						<AlertTitle>
							Thank you <span className={styles.name}>{name}</span> for your
							message!
						</AlertTitle>
						I will get back to you{' '}
						<span>
							<strong>ASAP</strong>
						</span>
					</Alert>
					<FontAwesomeIcon
						icon={faSquareCheck}
						className={styles['fa-square-check']}
						textAnchor='hi icons'
					/>
				</div>
			)}
		</main>
	)
}
