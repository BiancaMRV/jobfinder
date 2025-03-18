import { useState, useEffect } from "react";
import styles from "./JobCards.module.css";
import { Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { JobType } from "../types";

type Job = {
  id: number;
  logo: string;
  company_logo: string;
  title: string;
  experiencelevelid: string;
  jobtypeid: string;
  description: string;
};

export const jobTypesAndExerienceLevels: JobType[] = [
  { value: "full-time", label: "Full Time", type: "jobType" },
  { value: "part-time", label: "Part Time", type: "jobType" },
  { value: "contract", label: "Contract", type: "jobType" },
  { value: "freelance", label: "Freelance", type: "jobType" },
  { value: "internship", label: "Internship", type: "jobType" },
  { value: "volunteering", label: "Volunteering", type: "jobType" },

  { value: "entry", label: "Entry Level", type: "experienceLevel" },
  { value: "mid", label: "Mid Level", type: "experienceLevel" },
  { value: "senior", label: "Senior", type: "experienceLevel" },
  { value: "lead", label: "Lead", type: "experienceLevel" },
  { value: "executive", label: "Executive", type: "experienceLevel" },
];

export default function JobCards({ filters }: { filters: any }) {
  const [joboffers, setjoboffers] = useState<Job[]>([]);

  const fetchdata = async () => {
    try {
      let baseUrl = "http://localhost:3000/jobs/filter";

      if (filters?.jobTypes)
        baseUrl += `?jobType=${filters.jobTypes.join(",")}`;
      if (filters?.experienceLevels)
        baseUrl += `&experienceLevel=${filters.experienceLevels.join(",")}`;
      if (filters?.salaryRange)
        baseUrl += `&minSalary=${filters.salaryRange[0]}&maxSalary=${filters.salaryRange[1]}`;

      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      const data = await response.json();
      console.log("Data:", data);
      data.forEach((job: any) => {
        job.jobtypeid = job.jobtypeid.split(",");
        job.experiencelevelid = job.experiencelevelid.split(",");
      });

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
    fetchdata();
  }, [filters]);

  return (
    <div className={styles.jobCardsContainer}>
      {joboffers.map((job) => (
        <JobCard
          key={job.id}
          id={job.id}
          logo={job.company_logo}
          title={job.title}
          tags={[...job.experiencelevelid, ...job.jobtypeid]}
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
  id: number;
};

const JobCard = ({ logo, title, tags, description, id }: JobCardProps) => {
  console.log("JobCard:", { logo, title, tags, description });
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
            {tags
              .map((tag) => {
                const jobType = jobTypesAndExerienceLevels.find(
                  (type) => type.value === tag
                );
                return jobType?.label;
              })
              .map((tag, index) => (
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
              <Clock size={16} />
              <p>2 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
