import { FC } from "react";
import styles from "./OverviewCompany.module.css";
import { Building, StickyNote, MapPin, Calendar } from "lucide-react";
import { useEffect, useState } from "react";

interface JobOffer {
  id: string;
  title: string;
  location: string;
  date: string;
  description: string;
}

const OverviewCompany: FC = () => {
  const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);

  useEffect(() => {
    // Load job offers from localStorage on component mount
    const savedJobOffers = localStorage.getItem("jobOffers");
    if (savedJobOffers) {
      const parsedOffers = JSON.parse(savedJobOffers);
      // Only show most recent 2-3 job offers in overview
      setJobOffers(parsedOffers.slice(0, 3));
    }

    // Add event listener to detect changes from other components
    const handleJobUpdate = () => {
      const updatedOffers = localStorage.getItem("jobOffers");
      if (updatedOffers) {
        const parsedOffers = JSON.parse(updatedOffers);
        setJobOffers(parsedOffers.slice(0, 3));
      }
    };

    window.addEventListener("jobOffersUpdated", handleJobUpdate);

    return () => {
      window.removeEventListener("jobOffersUpdated", handleJobUpdate);
    };
  }, []);

  return (
    <div className={styles.overviewContainer}>
      {/* Company Info Section */}
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

      {/* Posted Jobs Section */}
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
