import styles from "./HomePage.module.css";
import Header from "../../layout/Header/Header";
import { FiltersInterface } from "../FiltersInterface/FiltersInterface";
import JobCards from "../JobCard/JobCards";
import { useEffect, useState } from "react";
import useMediaQuery from "../../../utils/useMediaQuery";

export default function HomePage() {
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState({});
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    console.log("filters", filters);
  }, [filters]);

  return (
    <section className={styles.homepagecontainer}>
      <div className={styles.headercontainer}>
        <Header />
      </div>

      <div className={styles.recommendedjobscontainer}>
        <section className={styles.RecommendedJobs}>
          <h2 className={styles.titlerecommendedjobs}>Recommended Jobs</h2>
          {isMobile && (
            <button
              className={styles.filtertogglebutton}
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          )}
        </section>
      </div>

      <div className={styles.maincontent}>
        {(showFilters || !isMobile) && (
          <FiltersInterface onFiltersChange={setFilters} />
        )}
        {!(showFilters && isMobile) && <JobCards filters={filters} />}
      </div>
    </section>
  );
}
