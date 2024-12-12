import styles from "./HomePage.module.css";
import Header from "../../layout/Header/Header";
import { FiltersInterface } from "../FiltersInterface/FiltersInterface";
import JobCard from "../JobCard/JobCards";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [showFilters, setShowFilters] = useState(true); // Controla visibilidade dos filtros no mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Detecta se estamos em mobile

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches); // Atualiza o estado isMobile com base na largura
    };

    handleMediaChange(mediaQuery); // Verifica o estado inicial

    mediaQuery.addEventListener("change", handleMediaChange); // Escuta mudanças na largura

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange); // Remove listener ao desmontar
    };
  }, []);

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
        {isMobile && (
          <div className={styles.containerpai}>
            {/* <button
              className={styles.filtertogglebutton}
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button> */}
          </div>
        )}
      </div>

      <div className={styles.maincontent}>
        {(showFilters || !isMobile) && <FiltersInterface />}
        {!(showFilters && isMobile) && <JobCard />}
      </div>
    </section>
  );
}
