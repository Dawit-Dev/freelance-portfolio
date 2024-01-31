import prisma from "@/lib/db";
import About from "@/components/about";

export const getAboutData = async () => {
	const about = await prisma.about.findMany();
	return about[0];
};

export default async function AboutPage() {
	const about = await getAboutData();

	return (
		<About
			id={about.id}
			title={about.title}
			bio={about.bio}
			image={about.image}
		/>
	);
}
