import styles from "./JobCardPage.module.css";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Markdown from "react-markdown";
import Header from "../../layout/Header/Header";

// Define the Job interface
interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  salaryrange?: string;
  experiencelevelid?: number;
  jobtypeid?: number;
  logo?: string;
  created_at: string;
  company_name?: string;
}

export default function JobCardPage() {
  const { jobOfferId } = useParams();
  const [jobOffer, setJobOffer] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("Fetching job data for ID:", jobOfferId);

        const baseURL = `http://localhost:3000/jobs/${jobOfferId}`;
        const response = await fetch(baseURL, {
          credentials: "include", // Include credentials if needed
        });

        if (!response.ok) {
          throw new Error("Request error: " + response.statusText);
        }

        const data = await response.json();
        console.log("Fetched Job Data:", data);
        setJobOffer(data);
      } catch (error) {
        console.error("Error fetching job data:", error);
        setError("Failed to load job details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (jobOfferId) {
      fetchData();
    }
  }, [jobOfferId]);

  // Default markdown for job descriptions that don't have one
  const defaultMarkdown = ` 
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

  // Function to format job type
  const formatJobType = (typeId?: number): string => {
    if (!typeId) return "Not specified";

    const jobTypes: Record<number, string> = {
      1: "Full Time",
      2: "Part Time",
      3: "Contract",
      4: "Freelance",
      5: "Internship",
    };

    return jobTypes[typeId] || "Not specified";
  };

  // Function to format experience level
  const formatExperienceLevel = (levelId?: number): string => {
    if (!levelId) return "Not specified";

    const experienceLevels: Record<number, string> = {
      1: "Entry Level",
      2: "Mid Level",
      3: "Senior Level",
      4: "Director",
      5: "Executive",
    };

    return experienceLevels[levelId] || "Not specified";
  };

  return (
    <div className={styles.jobofferpage}>
      <div className={styles.headercontainer}>
        <Header />
      </div>
      <div className={styles.jobcardpagecontainer}>
        {loading ? (
          <div className={styles.loading}>Loading job details...</div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : jobOffer ? (
          <div key={jobOffer.id} className={styles.jobcardpage}>
            <div className={styles.leftsection}>
              <div className={styles.titleandtagssection}>
                <h2 className={styles.titlejoboffer}>{jobOffer.title}</h2>
                <div className={styles.tagContainer}>
                  <span className={styles.experience_level}>
                    {formatExperienceLevel(jobOffer.experiencelevelid)}
                  </span>
                  <span className={styles.job_type}>
                    {formatJobType(jobOffer.jobtypeid)}
                  </span>
                </div>
              </div>
              <div className={styles.description}>
                <Markdown>{jobOffer.description || defaultMarkdown}</Markdown>
              </div>
            </div>
            <div className={styles.rightsection}>
              {jobOffer.logo ? (
                <img
                  src={jobOffer.logo}
                  alt={`${jobOffer.company_name || "Company"} logo`}
                  className={styles.companyLogo}
                />
              ) : (
                <div className={styles.placeholderLogo}>
                  {(jobOffer.company_name || "C").charAt(0)}
                </div>
              )}
              <p className={styles.companyName}>
                {jobOffer.company_name || "Company"}
              </p>
              <p className={styles.location}>{jobOffer.location || "Remote"}</p>
              {jobOffer.salaryrange && (
                <span className={styles.salaryrange}>
                  {jobOffer.salaryrange}
                </span>
              )}
              <p className={styles.postedDate}>
                Posted: {new Date(jobOffer.created_at).toLocaleDateString()}
              </p>
              <Link
                to={`/applynow/${jobOfferId}`}
                className={styles.applybutton}
              >
                Apply now
              </Link>
            </div>
          </div>
        ) : (
          <p className={styles.noJobOffer}>No job offer available</p>
        )}
      </div>
    </div>
  );
}
