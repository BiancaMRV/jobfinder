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
        <div>
          <input
            className={styles.input}
            type="checkbox"
            id="full-time"
            name="jobType"
            value="Full Time"
            checked={filters.jobTypes.includes("Full Time")}
            onClick={() => handleCheckboxChange("Full Time")}
          />
          <label className={styles.label} htmlFor="full-time">
            Full Time
          </label>
        </div>

        <div>
          <input
            className={styles.input}
            type="checkbox"
            id="part-time"
            name="jobType"
            value="Part Time"
            checked={filters.jobTypes.includes("Part Time")}
            onClick={() => handleCheckboxChange("Part Time")}
          />
          <label className={styles.label} htmlFor="part-time">
            Part Time
          </label>
        </div>

        <div>
          <input
            className={styles.input}
            type="checkbox"
            id="internship"
            name="jobType"
            value="Internship" /* value should be unique, and we use value to send the request to server */
            checked={filters.jobTypes.includes("Internship")}
            onClick={() => handleCheckboxChange("Internship")}
          />
          <label className={styles.label} htmlFor="internship">
            Internship
          </label>
        </div>

        <div>
          <input
            className={styles.input}
            type="checkbox"
            id="volunteering"
            name="jobType"
            value="Volunteering"
            checked={filters.jobTypes.includes("Volunteering")}
            onClick={() => handleCheckboxChange("Volunteering")}
          />
          <label className={styles.label} htmlFor="volunteering">
            Volunteering
          </label>
        </div>
      </div>
    </div>
  );
};
