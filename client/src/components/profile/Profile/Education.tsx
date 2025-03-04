import styles from "./Education.module.css";
import { useEffect } from "react";
import { GraduationCap } from "lucide-react";
import Entry from "./Entry";

export default function Education() {
  const educationData = [
    {
      title: "Computer Science",
      date: "University of Minho • 2018 - 2022",
      description: "Specialized in software engineering.",
    },
    {
      title: "Computer Science",
      date: "TechCorp • 2022 - Present",
      description:
        "Developing responsive web applications using React and TypeScript.",
    },
    {
      title: "Economics in Tech",
      date: "TechCorp • 2022 - Present",
      description:
        "Developing responsive web applications using NodeJS and TypeScript.",
    },
  ];

  useEffect(() => {
    // TODO: Fetch experience data from the server
  }, []);

  return (
    <div className={styles.overviewContainer}>
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <GraduationCap size={24} className={styles.sectionIcon} />
          <span className={styles.sectionTitle}>Education</span>
        </div>

        {educationData.map((education, index) => (
          <Entry
            title={education.title}
            date={education.date}
            description={education.description}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
