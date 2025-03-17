import { FC } from "react";
import styles from "./PostedJobs.module.css";
import { Briefcase, MapPin, Calendar, Trash2, Edit } from "lucide-react";

interface JobOffer {
  id: string;
  title: string;
  location: string;
  date: string;
  description: string;
}

interface PostedJobsProps {
  jobOffers: JobOffer[];
}

const PostedJobs: FC<PostedJobsProps> = ({ jobOffers }) => {
  return (
    <div className={styles.postedJobsContainer}>
      <h3 className={styles.sectionTitle}>Your Posted Job Offers</h3>

      {jobOffers.length === 0 ? (
        <div className={styles.noJobs}>
          <p>You haven't posted any job offers yet.</p>
          <p>
            Click the "Publish Job Offer" button to create your first job
            listing!
          </p>
        </div>
      ) : (
        jobOffers.map((job) => (
          <div key={job.id} className={styles.jobCard}>
            <div className={styles.jobHeader}>
              <h4 className={styles.jobTitle}>{job.title}</h4>
              <div className={styles.jobActions}>
                <button className={styles.actionButton}>
                  <Edit size={16} />
                </button>
                <button className={styles.actionButton}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className={styles.jobDetails}>
              <div className={styles.jobDetail}>
                <MapPin size={16} />
                <span>{job.location}</span>
              </div>
              <div className={styles.jobDetail}>
                <Calendar size={16} />
                <span>{job.date}</span>
              </div>
            </div>

            <p className={styles.jobDescription}>{job.description}</p>

            <div className={styles.jobStats}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Views:</span>
                <span className={styles.statValue}>0</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Applications:</span>
                <span className={styles.statValue}>0</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostedJobs;
