"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../../../styles/details.module.css";
import AnimatedText from "@/components/text-animation";

const projectState = history.state;

type ProjectProps = {
	id: number;
	title: string;
	image: string;
	summary: string | null;
	demo: string;
};

export default function ProjectDetails() {
	const initialState = { id: 0, title: "", image: "", summary: "", demo: "" };

	const [project, setProject] = useState<ProjectProps>(initialState);

	useEffect(() => {
		setProject(projectState.state);
	}, []);

	return (
		<div className={styles["details-main"]}>
			<AnimatedText
				text={project.title}
				el="h1"
				delay={0.5}
				className={styles["project-name"]}
			/>
			{project && (
				<div className={styles["details-container"]}>
					<Image
						src={`/images/${project.image}`}
						alt={project.title}
						loading="eager"
						className={styles["details-img"]}
						width={340}
						height={240}
						sizes="(min-width: 300px) 100vw"
						placeholder="blur"
						blurDataURL={`/images/${project.image}`}
					/>
					<p className={styles["details-summary"]}>
						{project.summary ? project.summary : ""}
					</p>
				</div>
			)}
			<div className={styles["link-container"]}>
				<a
					href={project.demo}
					target="_blank"
					rel="noreferrer"
					className={styles["live-demo"]}
				>
					Visit {project.title}
				</a>
			</div>
		</div>
	);
}
