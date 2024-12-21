import styles from "./HomePage.module.css";
import Header from "../../layout/Header/Header";
import { FiltersInterface } from "../FiltersInterface/FiltersInterface";
import JobCard from "../JobCard/JobCards";
import { useState } from "react";
import useMediaQuery from "../useMediaQuery";

export default function HomePage() {
  const [showFilters, setShowFilters] = useState(true); // Controla visibilidade dos filtros no mobile
  const isMobile = useMediaQuery("(max-width: 768px)"); // Verifica se a tela é mobile

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
        {(showFilters || !isMobile) && <FiltersInterface />}
        {!(showFilters && isMobile) && <JobCard />}
      </div>
    </section>
  );
}
