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

  // Estado para controlar a visibilidade dos filtros no mobile
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (filterName: FilterName, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));

    console.log(filters);
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
      {/* Botão para alternar os filtros no mobile */}
      <button
        className={styles.mobileFilterButton}
        onClick={() => setShowFilters(!showFilters)} // Inverte o estado 'showFilters'
      >
        {showFilters ? "Hide Filters" : "Show Filters"}{" "}
        {/* Alterna o texto do botão */}
      </button>

      {/* Mostrar filtros apenas quando o estado 'showFilters' for verdadeiro no mobile */}
      <div
        className={`${styles.filtersContainer} ${
          showFilters ? styles.show : styles.hide // Adiciona a classe 'show' ou 'hide' dependendo do estado 'showFilters'
        }`}
      >
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
      </div>
    </section>
  );
};
