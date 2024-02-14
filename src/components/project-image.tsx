import Image from 'next/image'

import tvShow from '../../public/images/tv-show.png'
import structuralEngineering from '../../public/images/bereket.png'
import eCommerce from '../../public/images/ecommerce.png'
import videos from '../../public/images/videos.png'
import jobListings from '../../public/images/job-listings.png'
import countries from '../../public/images/countries.png'
import portfolio from '../../public/images/dawit-portfolio.png'
import allTimeMovies from '../../public/images/all-time-movies.png'
import cyfHotel from '../../public/images/cyf-hotel-react.png'
import styles from '../styles/projects.module.css'

export default function ProjectImage({
	src,
	alt,
}: {
	src: string
	alt: string
}) {
	return (
		<Image
			src={
				src === 'tv-show.png'
					? tvShow
					: src === 'bereket.png'
					? structuralEngineering
					: src === 'ecommerce.png'
					? eCommerce
					: src === 'videos.png'
					? videos
					: src === 'job-listings.png'
					? jobListings
					: src === 'countries.png'
					? countries
					: src === 'dawit-portfolio.png'
					? portfolio
					: src === 'all-time-movies.png'
					? allTimeMovies
					: src === 'cyf-hotel-react.png'
					? cyfHotel
					: ''
			}
			alt={alt}
			loading='eager'
			className={styles['project-img']}
		/>
	)
}
