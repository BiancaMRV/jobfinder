import styles from "./FiltersInterface.module.css";
import { JobFilter } from "../JobList/JobFilter";
import { SalaryRange } from "../SalaryRange/SalaryRange";
import { ExperienceLevelFilter } from "../ExperienceLevel/ExperienceLevelFilter";
import { useState } from "react";
import { Filter, FilterName } from "../types";

// Interface para as props do componente
interface FiltersInterfaceProps {
  onFiltersChange: (filters: Filter) => void;
}

export const FiltersInterface: React.FC<FiltersInterfaceProps> = ({
  onFiltersChange,
}) => {
  const [filters, setFilters] = useState<Filter>({
    salaryRange: [0, 200000] as [number, number],
    experienceLevels: [],
    jobTypes: [],
  });

  const handleFilterChange = (filterName: FilterName, value: any) => {
    const newFilters = {
      ...filters,
      [filterName]: value,
    };
    console.log("newFilters", newFilters);
    setFilters(newFilters);
    onFiltersChange(newFilters); // Notifica o componente pai sobre as mudanças
  };

  const clearAll = () => {
    const defaultFilters = {
      salaryRange: [0, 200000] as [number, number],
      experienceLevels: [],
      jobTypes: [],
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters); // Notifica o componente pai sobre o reset
  };

  return (
    <section className={styles.filtersinterfacecontainer}>
      <div className={styles.filterGroup}>
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
