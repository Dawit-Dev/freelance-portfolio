import prisma from '@/lib/client'
import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootswatch/dist/sandstone/bootstrap.min.css'
import '../styles/globals.css'

const raleway = Raleway({ subsets: ['cyrillic'] })

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
			<body className={raleway.className}>
				<Navbar />
				{children}
				<Footer contact={contact} />
			</body>
		</html>
	)
}
