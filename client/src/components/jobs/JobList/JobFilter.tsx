import styles from "./JobFilter.module.css";
import { FilterComponentProps } from "../types";
import { jobTypesAndExerienceLevels } from "../JobCard/JobCards";

export const JobFilter: React.FC<FilterComponentProps> = ({
  filters,
  onFilterChange,
  clearAll,
}) => {
  const jobTypes = jobTypesAndExerienceLevels.filter(
    (type) => type.type === "jobType"
  );

  const handleCheckboxChange = (value: string) => {
    const currentTypes = new Set(filters.jobTypes);
    if (currentTypes.has(value)) {
      currentTypes.delete(value);
    } else {
      currentTypes.add(value);
    }
    onFilterChange("jobTypes", Array.from(currentTypes));
  };

  return (
    <div className={styles.jobContainer}>
      <div className={styles.jobtypetitle}>
        <h4>Job Type</h4>
        <button className={styles.clearAllButton} onClick={() => clearAll?.()}>
          Clear All
        </button>
      </div>
      <div className={styles.jobType}>
        {jobTypes.map((type) => (
          <div key={type.value}>
            <input
              className={styles.input}
              type="checkbox"
              id={type.value}
              name="jobType"
              value={type.value}
              checked={filters.jobTypes.includes(type.value)}
              onChange={() => handleCheckboxChange(type.value)}
            />
            <label className={styles.label} htmlFor={type.value}>
              {type.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
