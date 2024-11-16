import styles from "./ExperienceLevelFilter.module.css";
import { FilterComponentProps } from "../types";
import { ExperienceLevel } from "../types";

export const ExperienceLevelFilter: React.FC<FilterComponentProps> = ({
  filters,
  onFilterChange,
}) => {
  const experienceLevels: ExperienceLevel[] = [
    { value: "entry", label: "Entry Level (0-2 years)" },
    { value: "mid", label: "Mid Level (3-5 years)" },
    { value: "senior", label: "Senior (6-8 years)" },
    { value: "lead", label: "Lead (8+ years)" },
    { value: "executive", label: "Executive (10+ years)" },
  ];

  const handleCheckboxChange = (value: string) => {
    const currentLevels = new Set(filters.experienceLevels);
    if (currentLevels.has(value)) {
      currentLevels.delete(value);
    } else {
      currentLevels.add(value);
    }
    onFilterChange("experienceLevels", Array.from(currentLevels));
  };

  return (
    <div className={styles.ExperienceContainer}>
      <h4>Experience Level</h4>
      <div className={styles.experiencelevel}>
        <div>
          <input
            className={styles.input}
            type="checkbox"
            id="Entry"
            name="experience"
            value="Entry"
            checked={filters.experienceLevels.includes("Entry")}
            onClick={() => handleCheckboxChange("Entry")}
          />
          <label className={styles.label} htmlFor="Entry">
            Entry
          </label>
        </div>

        <div>
          <input
            className={styles.input}
            type="checkbox"
            id="Intermediate"
            name="experience"
            value="Intermediate"
            checked={filters.experienceLevels.includes("Intermediate")}
            onClick={() => handleCheckboxChange("Intermediate")}
          />

          <label className={styles.label} htmlFor="Intermediate">
            Intermediate
          </label>
        </div>
        <div>
          <input
            className={styles.input}
            type="checkbox"
            id="Senior"
            name="experience"
            value="Senior"
            checked={filters.experienceLevels.includes("Senior")}
            onClick={() => handleCheckboxChange("Senior")}
          />
          <label className={styles.label} htmlFor="Senior">
            Senior
          </label>
        </div>
      </div>
    </div>
  );
};
