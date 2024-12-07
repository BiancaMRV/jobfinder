import styles from "./HomePage.module.css";
import Header from "../../layout/Header/Header";
import RecommendedJobs from "../RecommendedJobs/RecommendedJobs";
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
      {/* Header */}
      <div className={styles.headercontainer}>
        <Header />
      </div>

      {/* Recommended Jobs */}
      <div className={styles.recommendedjobscontainer}>
        <RecommendedJobs />
      </div>

      {/* Botão para mostrar/ocultar filtros (apenas em mobile) */}
      {isMobile && (
        <div className={styles.filtertogglebutton}>
          <button onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className={styles.maincontent}>
        {/* Filtros visíveis no desktop ou controlados no mobile */}
        {(showFilters || !isMobile) && <FiltersInterface />}
        <JobCard />
      </div>
    </section>
  );
}
