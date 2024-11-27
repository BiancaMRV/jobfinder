import { useState, useEffect } from "react";
import styles from "./JobCard.module.css";
type Job = {
  id: string;
  logo: string;
  company_logo: string;
  title: string;
  experience_level: string;
  job_type: string;
  description: string;
};

export default function JobCards() {
  const [joboffers, setjoboffers] = useState<Job[]>([]);

  const fetchdata = async () => {
    try {
      const response = await fetch("http://localhost:5000/jobs/filter");

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      const data: Job[] = await response.json(); // Tipo explícito para a resposta
      setjoboffers(data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div>
      {joboffers.map((job) => (
        <JobCard
          key={job.id}
          logo={job.company_logo}
          title={job.title}
          tags={[job.experience_level, job.job_type]}
          description={
            job.description
              ? job.description.substring(0, 100) + "..."
              : "Descrição não disponível"
          }
        />
      ))}
    </div>
  );
}

type JobCardProps = {
  logo: string;
  title: string;
  tags: string[];
  description: string;
};

const JobCard = ({ logo, title, tags, description }: JobCardProps) => {
  return (
    <div className={styles.jobcontainer}>
      <div className={styles.headercontainer}>
        <img src={logo} alt="Company logo" />
        <h2>{title}</h2>
      </div>

      <div className={styles.tags}>
        <div className={styles.tagcontainerexperiencelevel}>
          <span className={styles.tag1}>Entry Level</span>
          <span className={styles.tag2}>Full-Time</span>
          <span className={styles.tag3}>Remote</span>
        </div>
        <div className={styles.jobdescriptioncontainer}>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};
