import styles from "./Overview.module.css";
import { Briefcase, GraduationCap, Lightbulb } from "lucide-react";
import Entry from "./Entry";
import { useEffect } from "react";

export default function Overview() {
  useEffect(() => {
    //buscar dados do servidor
  }, []);

  return (
    <div className={styles.overviewContainer}>
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <Briefcase size={24} className={styles.sectionIcon} />
          <span className={styles.sectionTitle}>Experience</span>
        </div>

        <Entry
          title="Computer Science"
          date="University of Minho • 2018 - 2022"
          description="Specialized in software engineering."
        />
      </div>

      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <GraduationCap size={24} className={styles.sectionIcon} />
          <span className={styles.sectionTitle}>Education</span>
        </div>

        <Entry
          title="Computer Science"
          date="University of Minho • 2018 - 2022"
          description="Specialized in software engineering."
        />
      </div>
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <Lightbulb size={24} className={styles.sectionIcon} />
          <span className={styles.sectionTitle}>Skills</span>
        </div>

        <Entry
          title="Computer Science"
          date="University of Minho • 2018 - 2022"
          description="Specialized in software engineering."
        />
      </div>
    </div>
  );
}
