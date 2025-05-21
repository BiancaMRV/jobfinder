import { FC } from "react";
import styles from "./OverviewCompany.module.css";
import { Building, StickyNote, MapPin, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../utils/const";

interface JobOffer {
  id: string;
  title: string;
  location: string;
  date: string;
  description: string;
}

const OverviewCompany: FC = () => {
  const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobOffers = async () => {
      try {
        console.log("getting joboffers...");
        const response = await fetch(BACKEND_URL + `/jobs/company`, {
          credentials: "include",
        });

        if (!response.ok) {
          console.error("Error status:", response.status);
          throw new Error(`Failed to fetch job offers: ${response.status}`);
        }

        const responseText = await response.text();
        console.log("Raw response:", responseText);

        let data;
        try {
          data = JSON.parse(responseText);
        } catch (e) {
          console.error("Error parsing JSON:", e);
          setError("Resposta inválida do servidor");
          setLoading(false);
          return;
        }

        console.log("Job offers received:", data);
        setJobOffers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching job offers:", error);
        setError("Erro ao buscar ofertas de trabalho");
      } finally {
        setLoading(false);
      }
    };

    fetchJobOffers();
  }, []);

  return (
    <div className={styles.overviewContainer}>
 
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <Building size={24} className={styles.sectionIcon} color="#6b46c1" />
          <span className={styles.sectionTitle}>Company Info</span>
        </div>

        <div className={styles.entryContainer}>
          <div className={styles.entryContent}>
            <h3 className={styles.entryTitle}>Uphold</h3>
            <p className={styles.entrySubtitle}>Since 2010 - current</p>
            <p className={styles.entryDescription}>
              Specialized in software engineering and financial technology
              solutions.
            </p>

            <div className={styles.companyDetails}>
              <div className={styles.detailItem}>
                <MapPin size={16} color="#666" />
                <span>Braga, Portugal</span>
              </div>
            </div>
          </div>
        </div>
      </div>

  
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <StickyNote
            size={24}
            className={styles.sectionIcon}
            color="#6b46c1"
          />
          <span className={styles.sectionTitle}>Posted Jobs</span>
        </div>

        {jobOffers.length === 0 ? (
          <div className={styles.noJobs}>
            <p>No job offers posted yet.</p>
            <p>
              Use the "Publish Job Offer" button to add your first job posting.
            </p>
          </div>
        ) : (
          jobOffers.map((job) => (
            <div key={job.id} className={styles.entryContainer}>
              <div className={styles.entryContent}>
                <h3 className={styles.entryTitle}>{job.title}</h3>
                <div className={styles.jobMeta}>
                  <div className={styles.detailItem}>
                    <MapPin size={16} color="#666" />
                    <span>{job.location}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <Calendar size={16} color="#666" />
                    <span>{job.date}</span>
                  </div>
                </div>
                <p className={styles.entryDescription}>{job.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OverviewCompany;
