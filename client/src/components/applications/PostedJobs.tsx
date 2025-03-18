import { FC } from "react";
import styles from "./PostedJobs.module.css";
import { Briefcase, MapPin, Calendar, Trash2, Edit, Plus } from "lucide-react";
import { Link } from "react-router-dom";

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
      <div className={styles.headerContainer}>
        <h3 className={styles.sectionTitle}>Your Posted Job Offers</h3>
        <Link to="/jobapplication" className={styles.publishButton}>
          <Plus size={16} />
          Publish Job Offer
        </Link>
      </div>

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
                <Link
                  to={`/edit-job-offer/${job.id}`}
                  className={styles.actionButton}
                >
                  <Edit size={16} />
                </Link>
                <button className={styles.actionButton}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostedJobs;
