import styles from "./HomePage.module.css";
import Header from "../../layout/Header/Header";
import RecommendedJobs from "../RecommendedJobs/RecommendedJobs";
import { FiltersInterface } from "../FiltersInterface/FiltersInterface";
import JobCard from "../JobCard/JobCards";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [showFilters, setShowFilters] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };

    handleMediaChange(mediaQuery);

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  return (
    <section className={styles.homepagecontainer}>
      <div className={styles.headercontainer}>
        <Header></Header>
      </div>
      <div className={styles.recommendedjobscontainer}>
        <RecommendedJobs></RecommendedJobs>
        <div>
          <button onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>
      </div>
      <div className={styles.maincontent}>
        <FiltersInterface />
        <JobCard />
      </div>
    </section>
  );
}
