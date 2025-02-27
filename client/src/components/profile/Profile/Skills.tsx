import styles from "./Skills.module.css";
import { useEffect } from "react";
import { Lightbulb } from "lucide-react";
import Entry from "./Entry";

export default function Skills() {
  const skillsData = [
    {
      title: "React",
      date: "2",
      description:
        "Developing responsive web applications using React and TypeScript.",
    },
    {
      title: "NodeJS",
      date: "2",
      description:
        "Developing responsive web applications using NodeJS and TypeScript.",
    },
    {
      title: "Docker",
      date: "2",
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
          <Lightbulb size={24} className={styles.sectionIcon} />
          <span className={styles.sectionTitle}>Skills</span>
        </div>

        {skillsData.map((skills, index) => (
          <Entry
            title={skills.title}
            date={skills.date + " years of experience"}
            description={skills.description}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
