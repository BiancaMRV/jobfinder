import styles from "./HomePage.module.css";
import Header from "../../layout/Header/Header";
import RecommendedJobs from "../RecommendedJobs/RecommendedJobs";
import FiltersInterface from "../FiltersInterface/FiltersInterface";

export default function HomePage() {
  return (
    <section className={styles.homepagecontainer}>
      <Header></Header>

      <RecommendedJobs></RecommendedJobs>
      <FiltersInterface></FiltersInterface>
    </section>
  );
}
