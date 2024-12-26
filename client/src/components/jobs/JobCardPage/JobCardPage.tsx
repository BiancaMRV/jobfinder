import styles from "./JobCardPage.module.css";
import { useState, useEffect } from "react";
import { Job } from "../types";

export default function JobCardPage() {
  const [jobOffers, setjoboffers] = useState<Job[]>([]);

  const fetchdata = async () => {
    try {
      let baseURL = "http://192.168.1.20:3000/jobs";
      const response = await fetch(baseURL);
      if (!response.ok) {
        throw new Error("Erro na requisição: " + response.statusText);
      }
      const data: Job[] = await response.json(); // Tipo explícito para a resposta
      console.log("Data:", data);
      setjoboffers(data);
    } catch (error) {
      console.error("error fetching data:", error);
    }
  };
  useEffect(() => {
    console.log("Fetching data...");
    fetchdata();
  }, []);

  return (
    <div className={styles.jobcardpagecontainer}>
      <section className={styles.titlejoboffersection}>
        <h1 className={styles.titlejoboffer}>TITLE JOB OFFER</h1>
      </section>
      <section className={styles.jobofferdescriptionsection}>
        <p className={styles.jobofferdescription}>fbwbfjhbdjvbrfjksderw</p>
      </section>
      <section className={styles.jobofferdetailssection}>
        <div className={styles.jobofferdetails}>
          <p className={styles.jobofferdetail}>Location: Lisbon</p>
          <p className={styles.jobofferdetail}>Salary: 1000€</p>
          <p className={styles.jobofferdetail}>Experience: 2 years</p>
          <p className={styles.jobofferdetail}>Job Type: Full-Time</p>
        </div>
      </section>
      <section className={styles.jobofferapplysection}>
        <button className={styles.applybutton}>Apply</button>
      </section>
    </div>
  );
}
