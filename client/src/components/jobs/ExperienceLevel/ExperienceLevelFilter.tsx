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
        {experienceLevels.map((level) => (
          <div key={level.value}>
            <input
              className={styles.input}
              type="checkbox"
              id={level.value}
              name="experience"
              value={level.value}
              checked={filters.experienceLevels.includes(level.value)}
              onChange={() => handleCheckboxChange(level.value)}
            />
            <label className={styles.label} htmlFor={level.value}>
              {level.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
