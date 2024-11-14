import styles from "./FiltersInterface.module.css";
import JobFilter from "../JobList/JobFilter";
import SalaryRange from "../SalaryRange/SalaryRange";
import ExperienceLevel from "../ExperienceLevel/ExperienceLevel";
import { useState } from "react";

export default function FiltersInterface() {
  const [jobTypeFilters, setJobTypeFilters] = useState({
    fullTime: false,
    partTime: false,
    internship: false,
    volunteering: false,
  });

  const [experienceLevelFilters, setExperienceLevelFilters] = useState({
    entry: false,
    intermediate: false,
    senior: false,
  });

  const [salaryRange, setSalaryRange] = useState({
    min: 50000,
    max: 120000,
  });

  const handleClearAll = () => {
    setJobTypeFilters({
      fullTime: false,
      partTime: false,
      internship: false,
      volunteering: false,
    });
    setExperienceLevelFilters({
      entry: false,
      intermediate: false,
      senior: false,
    });
    setSalaryRange({
      min: 50000,
      max: 120000,
    });
  };
  return (
    <section className={styles.filtersinterfacecontainer}>
      <div className={styles.filterGroup}>
        <div className={styles.jobfilterheader}>
          <button className={styles.clearAllButton} onClick={handleClearAll}>
            Clear all
          </button>
          <JobFilter />
        </div>
      </div>
      <div className={styles.filterGroup}>
        <SalaryRange />
      </div>
      <div className={styles.filterGroup}>
        <ExperienceLevel />
      </div>
    </section>
  );
}
