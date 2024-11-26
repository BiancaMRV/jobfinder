import styles from "./JobCard.module.css";

export default function JobCard() {
  return (
    <div className={styles.jobcontainer}>
      <div className={styles.headercontainer}>
        <div className={styles.titlejobofferandlogo}>
          <img
            src="company-logo.png"
            alt="Company Logo"
            className="company-logo"
          />
          <h2 className={styles.joboffertitle}> job offer </h2>
        </div>
        <div className={styles.tagcontainerexperiencelevel}>
          <span className={styles.tag}>Entry Level</span>
          <span className={styles.tag}>Full-Time</span>
          <span className={styles.tag}>Remote</span>
        </div>
        <div className={styles.jobdescriptioncontainer}>
          <p className={styles.jobdescription}>começo da descricao</p>
        </div>
      </div>
    </div>
  );
}
