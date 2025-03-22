import styles from "./HomePage.module.css";
import Header from "../../layout/Header/Header";
import { FiltersInterface } from "../FiltersInterface/FiltersInterface";
import JobCards from "../JobCard/JobCards";
import { useState, useEffect } from "react";
import useMediaQuery from "../../../utils/useMediaQuery";

export default function HomePage() {
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState({});
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isLoading, setIsLoading] = useState(true);

  // Simular um tempo mínimo de carregamento para garantir que todos os componentes estejam prontos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleFiltersChange = (newFilters: any) => {
    console.log("Filters changed:", newFilters);
    setFilters(newFilters);
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <p>Carregando...</p>
      </div>
    );
  }

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
        {/* Sempre mostra os filtros em desktop ou quando showFilters é true em mobile */}
        {(showFilters || !isMobile) && (
          <FiltersInterface onFiltersChange={handleFiltersChange} />
        )}

        {/* MODIFICAÇÃO IMPORTANTE: Sempre mostrar JobCards, independentemente do estado dos filtros */}
        <div className={styles.jobCardsWrapper}>
          <JobCards filters={filters} />
        </div>
      </div>
    </section>
  );
}
