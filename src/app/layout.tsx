import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootswatch/dist/sandstone/bootstrap.min.css'
// import { getContactInfo } from '@/utils/get-contact-info'
import '../styles/globals.css'

import prisma from '@/lib/db'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'DB Freelance Developer',
	description: 'Freelance Developers Portfolio',
}

export const getContactInfo = async () => {
	const contact = await prisma.contact.findMany()
	return contact[0]
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const contact = await getContactInfo()
	return (
		<html lang='en'>
			{/* <head>
				<link
					rel='stylesheet'
					href='https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css'
					integrity='sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65'
					crossOrigin='anonymous'
				/>
				<link
					href='https://cdn.jsdelivr.net/npm/bootswatch@5.3.2/dist/sandstone/bootstrap.min.css'
					rel='stylesheet'
				/>
			</head> */}
			<body className={inter.className}>
				<Navbar />
				{children}
				<Footer contact={contact} />
			</body>
		</html>
	)
}
