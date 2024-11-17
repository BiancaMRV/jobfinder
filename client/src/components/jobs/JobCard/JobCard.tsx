import styles from "./JobCard.module.css";

export default function JobCard() {
  return (
    <div className={styles.jobCard}>
      <h2>Job Title</h2>
      <p>Job Description</p>
    </div>
  );
}
