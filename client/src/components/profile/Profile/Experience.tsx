import styles from "./Experience.module.css";
import { useEffect } from "react";
import { Briefcase } from "lucide-react";
import Entry from "./Entry";

export default function Experience() {
  const experienceData = [
    {
      title: "Frontend Developer",
      date: "TechCorp • 2022 - Present",
      description:
        "Developing responsive web applications using React and TypeScript.",
    },
    {
      title: "Backend Developer",
      date: "TechCorp • 2022 - Present",
      description:
        "Developing responsive web applications using NodeJS and TypeScript.",
    },
    {
      title: "Fullstack Developer",
      date: "TechCorp • 2022 - Present",
      description:
        "Developing responsive web applications using React, NodeJS and TypeScript.",
    },
    {
      title: "DevOps Engineer",
      date: "TechCorp • 2022 - Present",
      description:
        "Developing responsive web applications using Docker, Kubernetes and Jenkins.",
    },
  ];

  useEffect(() => {
    // TODO: Fetch experience data from the server
  }, []);

  return (
    <div className={styles.overviewContainer}>
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <Briefcase size={24} className={styles.sectionIcon} />
          <span className={styles.sectionTitle}>Experience</span>
        </div>

        {experienceData.map((experience, index) => (
          <Entry
            title={experience.title}
            date={experience.date}
            description={experience.description}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
