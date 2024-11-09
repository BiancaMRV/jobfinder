import styles from "./JobFilter.module.css";
import { useState } from "react";
// assuming your styles are here

export default function JobFilter() {
  //usestate return [state, setState]
  const [filters, setFilters] = useState({
    fulltime: false,
    parttime: false,
    intership: false,
    volunteering: false,
  });

  // Handle checkbox changes
  const handleFilterChange = (filterName: keyof typeof filters) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  return (
    <div className={styles.jobContainer}>
      <h3>Job Type</h3>
      <div className={styles.jobType}>
        <div>
          <input
            type="checkbox"
            id="full-time"
            name="jobType"
            value="Full Time"
            onClick={() => handleFilterChange("fulltime")}
          />
          <label htmlFor="full-time">Full Time</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="part-time"
            name="jobType"
            value="Part Time"
            onClick={() => handleFilterChange("parttime")}
          />
          <label htmlFor="part-time">Part Time</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="internship"
            name="jobType"
            value="Internship" /* value should be unique, and we use value to send the request to server */
            onClick={() => handleFilterChange("intership")}
          />
          <label htmlFor="internship">Internship</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="volunteering"
            name="jobType"
            value="Volunteering"
            onClick={() => handleFilterChange("volunteering")}
          />
          <label htmlFor="volunteering">Volunteering</label>
        </div>
      </div>
    </div>
  );
}
