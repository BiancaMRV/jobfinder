import styles from "./JobCard.module.css";

export default function JobCard() {
  return (
    <div className={styles.jobcontainer}>
      <div className={styles.titlejobofferandlogo}>
        <img
          src="company-logo.png"
          alt="Company Logo"
          className="company-logo"
        />
        <h2 className={styles.joboffertitle}> job offer </h2>
      </div>
      <div className={styles.experiencelevellabel}></div>
    </div>
  );
}
