import styles from "./JobCardPage.module.css";

export default function JobCardPage() {
  return (
    <div className={styles.jobcardpagecontainer}>
      <section className={styles.titlejoboffersection}>
        <h1 className={styles.titlejoboffer}>TITLE JOB OFFER</h1>
      </section>
      <section className={styles.jobofferdescriptionsection}>
        <p className={styles.jobofferdescription}>fbwbfjhbdjvbrfjksderw</p>
      </section>
      <section className={styles.jobofferdetailssection}>
        <div className={styles.jobofferdetails}>
          <p className={styles.jobofferdetail}>Location: Lisbon</p>
          <p className={styles.jobofferdetail}>Salary: 1000€</p>
          <p className={styles.jobofferdetail}>Experience: 2 years</p>
          <p className={styles.jobofferdetail}>Job Type: Full-Time</p>
        </div>
      </section>
      <section className={styles.jobofferapplysection}>
        <button className={styles.applybutton}>Apply</button>
      </section>
    </div>
  );
}
