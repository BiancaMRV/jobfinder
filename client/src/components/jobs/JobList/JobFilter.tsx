import styles from "./JobFilter.module.css";
import { FilterComponentProps } from "../types";
import { JobType } from "../types";

export const JobFilter: React.FC<FilterComponentProps> = ({
  filters,
  onFilterChange,
  clearAll,
}) => {
  const jobTypes: JobType[] = [
    { value: "full-time", label: "Full Time" },
    { value: "part-time", label: "Part Time" },
    { value: "contract", label: "Contract" },
    { value: "freelance", label: "Freelance" },
    { value: "internship", label: "Internship" },
    { value: "volunteering", label: "Volunteering" },
  ];

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
              onClick={() => handleCheckboxChange(type.value)}
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
