import styles from "./JobCardPage.module.css";
import { useState, useEffect } from "react";
import { Job } from "../types";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import Header from "../../layout/Header/Header";

export default function JobCardPage() {
  const { jobOfferId } = useParams();
  const [jobOffer, setJobOffer] = useState<Job | null>(null); // Tipo atualizado para um único Job ou null

  const fetchData = async () => {
    try {
      const baseURL = `http://0.0.0.0:3000/jobs/${jobOfferId}`;
      const response = await fetch(baseURL);
      if (!response.ok) {
        throw new Error("Erro na requisição: " + response.statusText);
      }
      const data: Job = await response.json(); // Tipo explícito para a resposta
      setJobOffer(data);
      console.log("Fetched Data:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const markdown = ` 
**About the role:**
Join a dynamic team to design, develop, and maintain high-performance software applications that scale globally. Collaborate with cross-functional teams to deliver impactful solutions and drive innovation.
    
**Responsibilities:**
- Architect and implement complex backend services and APIs.
- Work closely with frontend developers to ensure seamless integration.
- Mentor junior developers and contribute to the team's growth.
    
**Required Skills:**
- Proficiency in Node.js, TypeScript, and cloud platforms.
- Experience with RESTful APIs and microservices architecture.
- Strong debugging and optimization skills.
  `;

  useEffect(() => {
    console.log("Fetching data...");
    fetchData();
  }, [jobOfferId]); //Adicionei jobId como dependência do useEffect para recarregar quando o ID mudar

  return (
    <div className={styles.jobofferpagecontainer}>
      <div className={styles.headercontainer}>
        <Header />
      </div>
      {jobOffer ? (
        <div key={jobOffer.id} className={styles.jobcardpage}>
          <div className={styles.leftsection}>
            <div className={styles.titleandtagssection}>
              <h2 className={styles.titlejoboffer}> {jobOffer.title} </h2>
              <span className={styles.experience_level}>
                {jobOffer.experience_level}
              </span>
              <span className={styles.job_type}> {jobOffer.job_type} </span>
            </div>
            <div>
              <Markdown>{jobOffer.description || markdown}</Markdown>
            </div>
          </div>
          <div className={styles.rightsection}>
            <p className={styles.logo}> {jobOffer.logo} </p>
            <p className={styles.location}> {jobOffer.location} </p>
            <span className={styles.salaryrange}> {jobOffer.salaryrange} </span>
            <button className={styles.applybutton}>Apply now</button>
          </div>
        </div>
      ) : (
        <p>No job offer available</p>
      )}
    </div>
  );
}
//TODO: FORMATAR O TEXTO DE DISCRIPTION, PROCURAR OUTRA LIVRARIA
