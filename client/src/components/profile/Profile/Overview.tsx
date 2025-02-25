import styles from "./Overview.module.css";
import { Briefcase, Pencil, GraduationCap, FileText } from "lucide-react";
import { useState } from "react";

export default function Overview() {
  const [editExperience, seteditExperience] = useState(false);
  const [editEducation, seteditEducation] = useState(false);

  return (
    <div className={styles.overviewContainer}>
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <Briefcase size={24} />
          <span className={styles.sectionTitle}>Experience</span>
          <Pencil size={24} className={styles.editIcon} />
        </div>

        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Title"
            className={styles.inputField}
            required
          />

          <input
            type="text"
            placeholder="Date and Name of Company"
            className={styles.inputField}
            required
          />

          <input
            type="text"
            placeholder="Description"
            className={styles.inputField}
            required
          />
        </div>
      </div>

      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <GraduationCap size={24} />
          <span className={styles.sectionTitle}>Education</span>
          <Pencil size={24} className={styles.editIcon} />
        </div>

        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="CourseName"
            className={styles.inputField}
            required
          />

          <input
            type="text"
            placeholder="Institution And Date"
            className={styles.inputField}
            required
          />

          <input
            type="text"
            placeholder="Description"
            className={styles.inputField}
            required
          />
        </div>
      </div>

      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <FileText size={24} />
          <span className={styles.sectionTitle}>Documents</span>
          <Pencil size={24} className={styles.editIcon} />
        </div>
        <div className={styles.inputGroup}></div>
      </div>
    </div>
  );
}
