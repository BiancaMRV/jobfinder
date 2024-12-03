import styles from "./HomePage.module.css";
import Header from "../../layout/Header/Header";
import RecommendedJobs from "../RecommendedJobs/RecommendedJobs";
import { FiltersInterface } from "../FiltersInterface/FiltersInterface";
import JobCard from "../JobCard/JobCards";

export default function HomePage() {
  return (
    <section className={styles.homepagecontainer}>
      <div className={styles.headercontainer}>
        <Header></Header>
      </div>
      <div className={styles.recommendedjobsandfiltersinterfacecontainer}>
        <RecommendedJobs></RecommendedJobs>
      </div>
      <div className={styles.jobcardscontainer}>
        <FiltersInterface />
        <JobCard />
      </div>
    </section>
  );
}
