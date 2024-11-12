import styles from "./ExperienceLevel.module.css";
import { useState } from "react";

export default function ExperienceLevel() {
  const [experience, setExperience] = useState({
    entry: false,
    intermediate: false,
    senior: false,
  });
  const handleFilterChange = (experienceName: keyof typeof experience) => {
    setExperience((prev) => ({
      ...prev,
      [experienceName]: !prev[experienceName],
    }));
  };

  return (
    <div className={styles.ExperienceContainer}>
      <h3>Experience Level</h3>
      <div className={styles.experiencelevel}>
        <div>
          <input
            className={styles.Entry}
            type="checkbox"
            id="Entry"
            name="experience"
            value="Entry"
            checked={experience.entry}
            onClick={() => handleFilterChange("entry")}
          />
          <label htmlFor="Entry">Entry</label>
        </div>

        <div>
          <input
            className={styles.Intermediate}
            type="checkbox"
            id="Intermediate"
            name="experience"
            value="Intermediate"
            checked={experience.intermediate}
            onClick={() => handleFilterChange("intermediate")}
          />

          <label htmlFor="Intermediate">Intermediate</label>
        </div>
        <div>
          <input
            className={styles.Senior}
            type="checkbox"
            id="Senior"
            name="experience"
            value="Senior"
            checked={experience.senior}
            onClick={() => handleFilterChange("senior")}
          />
          <label htmlFor="Senior">Senior</label>
        </div>
      </div>
    </div>
  );
}
