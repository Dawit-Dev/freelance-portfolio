import {
	Roboto,
	Raleway,
	Playfair_Display,
	Montserrat,
} from 'next/font/google'

const roboto = Roboto({
	subsets: ['latin'],
	weight: '300',
})

const raleway = Raleway({ subsets: ['cyrillic'] })

const playfairDisplay = Playfair_Display({
	subsets: ['cyrillic'],
	weight: 'variable',
})

const montserrat = Montserrat({
	subsets: ['cyrillic'],
})

export {
	roboto,
	raleway,
	playfairDisplay,
	montserrat,
}
