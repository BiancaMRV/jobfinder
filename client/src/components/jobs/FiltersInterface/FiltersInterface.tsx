import styles from "./FiltersInterface.module.css";
import { JobFilter } from "../JobList/JobFilter";
import { SalaryRange } from "../SalaryRange/SalaryRange";
import { ExperienceLevelFilter } from "../ExperienceLevel/ExperienceLevelFilter";
import { useState } from "react";
import { Filter, FilterName } from "../types";

export const FiltersInterface: React.FC = () => {
  const [filters, setFilters] = useState<Filter>({
    salaryRange: [0, 200000],
    experienceLevels: [],
    jobTypes: [],
  });

  const handleFilterChange = (filterName: FilterName, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const clearAll = () => {
    setFilters({
      salaryRange: [0, 200000],
      experienceLevels: [],
      jobTypes: [],
    });
  };

  return (
    <section className={styles.filtersinterfacecontainer}>
      <div className={styles.jobfilterandbuttoncontainer}>
        <JobFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          clearAll={clearAll}
        />
      </div>
      <div className={styles.filterGroup}>
        <SalaryRange filters={filters} onFilterChange={handleFilterChange} />
      </div>
      <div className={styles.filterGroup}>
        <ExperienceLevelFilter
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      </div>
    </section>
  );
};
