import styles from "./HomePage.module.css";
import Header from "../../layout/Header/Header";
import RecommendedJobs from "../RecommendedJobs/RecommendedJobs";
import { FiltersInterface } from "../FiltersInterface/FiltersInterface";
import { useState, useEffect } from "react";
import JobCard from "../JobCard/JobCards";

export default function HomePage() {
  const [joboffers, setjoboffers] = useState([]);

  const fetchdata = async () => {
    try {
      const response = await fetch("http://localhost:5000/jobs/filter");

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      const data = await response.json();
      setjoboffers(data);
    } catch (error) {
      console.log("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <section className={styles.homepagecontainer}>
      <div className={styles.headercontainer}>
        <Header></Header>
      </div>
      <div className={styles.recommendedjobscontainer}>
        <RecommendedJobs></RecommendedJobs>
      </div>
      <div className={styles.maincontent}>
        <FiltersInterface />
        <JobCard />
      </div>
    </section>
  );
}
