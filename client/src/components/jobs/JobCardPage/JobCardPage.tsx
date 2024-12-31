import styles from "./JobCardPage.module.css";
import { useState, useEffect } from "react";
import { Job } from "../types";

export default function JobCardPage() {
  const [jobOffer, setJobOffer] = useState<Job | null>(null); // Tipo atualizado para um único Job ou null

  const fetchData = async () => {
    try {
      const baseURL = "http://192.168.1.20:3000/jobs/1";
      const response = await fetch(baseURL);
      if (!response.ok) {
        throw new Error("Erro na requisição: " + response.statusText);
      }
      const data: Job = await response.json(); // Tipo explícito para a resposta
      setJobOffer(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    console.log("Fetching data...");
    fetchData();
  }, []);

  return (
    <div className={styles.jobofferpagecontainer}>
      {jobOffer ? (
        <div key={jobOffer.id} className={styles.jobcardpage}>
          <div className={styles.titleandtagssection}>
            <h2 className={styles.titlejoboffer}> {jobOffer.title} </h2>
            <span className={styles.experience_level}>
              {jobOffer.experience_level}
            </span>
            <span className={styles.job_type}> {jobOffer.job_type} </span>
          </div>
          <div>
            <p className={styles.description}> {jobOffer.description} </p>
          </div>
          <p className={styles.logo}> {jobOffer.logo} </p>
          <p className={styles.location}> {jobOffer.location} </p>
          <span className={styles.salaryrange}> {jobOffer.salaryrange} </span>
          <button className={styles.applybutton}>Apply now</button>
        </div>
      ) : (
        <p>No job offer available</p>
      )}
    </div>
  );
}
