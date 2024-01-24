import prisma from '@/lib/db'
import Image from 'next/image'
import styles from '../styles/home.module.css'

export const getProfile = async () => {
	const profile = await prisma.profile.findMany()
	return profile[0]
}

export default async function Home() {
	const content = await getProfile()

	return (
		<main className={styles.main}>
			<div className={styles.hero}>
				<div className={styles.container}>
					<h1 className={styles.title}>{content.title}</h1>
					<p>{content.intro}</p>
				</div>
			</div>
			<section>
				{content.sub_titles.map((title, index) => (
					<div key={index}>
						<h4>{title}</h4>
						<div>
							<Image
								src={`/images/${content.images[index]}`}
								alt={title}
								loading='eager'
								className={styles['tech-img']}
								width={340}
								height={240}
								sizes='(min-width: 300px) 100vw'
								placeholder='blur'
								blurDataURL={`/images/${content.images[index]}`}
							/>
							<p>{content.description[index]}</p>
						</div>
					</div>
				))}
			</section>
		</main>
	)
}
