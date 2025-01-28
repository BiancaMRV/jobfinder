import { useState, useEffect } from "react";
import styles from "./JobCards.module.css";
import { Clock } from "lucide-react";
import { Link } from "react-router-dom";

type Job = {
  id: number;
  logo: string;
  company_logo: string;
  title: string;
  experience_level: string;
  job_type: string;
  description: string;
};

export default function JobCards() {
  const [joboffers, setjoboffers] = useState<Job[]>([]);

  const fetchdata = async (filters: any) => {
    try {
      let baseUrl = "http://localhost:3000/jobs/filter";

      if (filters.jobTypes) baseUrl += `?jobType=${filters.jobTypes.join(",")}`;
      if (filters.experienceLevels)
        baseUrl += `&experienceLevel=${filters.experienceLevels.join(",")}`;
      if (filters.salaryRange)
        baseUrl += `&minSalary=${filters.salaryRange[0]}&maxSalary=${filters.salaryRange[1]}`;

      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched Data:", data);

      if (Array.isArray(data)) {
        setjoboffers(data);
      } else {
        console.error("Dados inválidos:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    console.log("Fetching data...");
    fetchdata({});
  }, []);

  return (
    <div className={styles.jobCardsContainer}>
      {joboffers.map((job) => (
        <JobCard
          key={job.id}
          id={job.id}
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
  tags: string[]; // Um array de tags
  description: string;
  id: number;
};

const JobCard = ({ logo, title, tags, description, id }: JobCardProps) => {
  console.log(logo);
  return (
    <Link to={`/jobs/${id}`} className={styles.jobCardLink}>
      <div className={styles.jobcontainer}>
        <div className={styles.headercontainer}>
          <div className={styles.titlejoboffersandlogo}>
            <img src={logo} alt="Company logo" className={styles.companylogo} />
            <h2 className={styles.joboffertitle}>{title}</h2>
          </div>
        </div>
        <div className={styles.tagcontainer}>
          <div className={styles.tags}>
            {tags.map((tag, index) => (
              <span
                key={index}
                className={`${styles.tag} ${
                  tag === "Full Time"
                    ? styles.fullTime
                    : tag === "Part Time"
                    ? styles.partTime
                    : tag === "Senior"
                    ? styles.senior
                    : tag === "Entry Level"
                    ? styles.entryLevel
                    : tag === "Mid Level"
                    ? styles.midLevel
                    : tag === "Freelance"
                    ? styles.freelance
                    : tag === "Internship"
                    ? styles.internship
                    : tag === "Contract"
                    ? styles.contract
                    : tag === "Lead"
                    ? styles.lead
                    : ""
                  // TODO: Adicionar mais classes para outras tags
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
          <div className={styles.jobdescriptioncontainer}>
            <p>{description}</p>
          </div>
          <div className={styles.salaryandtimecontainer}>
            <div className={styles.salary}>
              <h3>Salary:</h3>
              <p>$1000,00</p>
            </div>
            <div className={styles.time}>
              <Clock size={16}> </Clock>
              <p>2 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
