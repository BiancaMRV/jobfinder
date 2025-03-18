import styles from "./JobApplication.module.css";
import { jobTypes } from "../jobs/JobCard/JobCards";

export default function JobApplication() {
  return (
    <div className={styles.jobApplicationContainer}>
      <div className={styles.jobApplicationHeader}>
        <h1>Create New JobOffer !</h1>
      </div>
      <div className={styles.jobApplicationForm}>
        <form>
          <input
            type="text"
            placeholder="Job Title"
            className={styles.inputField}
            required
          />
          <input
            type="text"
            placeholder="Location"
            className={styles.inputField}
            required
          />
          <div className={styles.jobtypes}>
            {jobTypes
              .map((tag) => {
                // const jobType = jobTypes.find((type) => type.value === tag);
                return tag.label;
              })
              .map((tag, index) => (
                <>
                  <label
                    htmlFor={tag}
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
                        : tag === "Volunteering"
                        ? styles.volunteering
                        : tag === "Executive"
                        ? styles.executive
                        : ""
                    }`}
                  >
                    {tag}
                  </label>
                  <input id={tag} type="checkbox"></input>
                </>
              ))}
          </div>

          <input
            type="text"
            placeholder="Salary"
            className={styles.inputField}
            required
          />
          <input
            type="text"
            placeholder="Description"
            className={styles.inputField}
            required
          />
          <button className={styles.saveButton}>Save Changes</button>
        </form>
      </div>
    </div>
  );
}
