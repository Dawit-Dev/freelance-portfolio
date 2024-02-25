import {
	Inter,
	Roboto,
	Roboto_Mono,
	Roboto_Slab,
	Righteous,
	Poppins,
	Titan_One,
	Montserrat,
	Merriweather,
	Raleway,
	Crimson_Text,
	Alegreya,
	Playfair_Display,
	Oswald,
	Lato,
} from 'next/font/google'

const inter = Inter({
	subsets: ['latin'],
})

const roboto = Roboto({
	subsets: ['cyrillic'],
	weight: '500',
})

const robotoMono = Roboto_Mono({
	subsets: ['latin'],
	display: 'swap',
})

const poppins = Poppins({
	weight: '300',
	subsets: ['latin'],
	display: 'swap',
})

const righteous = Righteous({
	weight: '400',
	subsets: ['latin'],
})

const titanOne = Titan_One({
	weight: '400',
	subsets: ['latin'],
})

const montserrat = Montserrat({
	weight: '500',
	subsets: ['latin'],
})

const merriweather = Merriweather({
	weight: '900',
	subsets: ['latin'],
})

const crimsonText = Crimson_Text({ weight: '700', subsets: ['latin'] })

const raleway = Raleway({ subsets: ['cyrillic'] })

const alegreya = Alegreya({ subsets: ['latin'] })

const playfairDisplay = Playfair_Display({
	subsets: ['cyrillic'],
	weight: 'variable',
})

const oswald = Oswald({ subsets: ['latin'] })

const lato = Lato({ subsets: ['latin'], weight: '400' })

const robotoSlab = Roboto_Slab({ subsets: ['latin'] })

export {
	inter,
	roboto,
	robotoMono,
	poppins,
	righteous,
	titanOne,
	montserrat,
	merriweather,
	raleway,
	crimsonText,
	alegreya,
	playfairDisplay,
	oswald,
	robotoSlab,
	lato,
}
