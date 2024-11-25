import styles from "./JobCard.module.css";
import { useState } from "react";

export default function JobCard() {
  const [joboffers, setjoboffers] = useState([]);

  const fetchdata = async () => {
    try {
      const response = await fetch("http://localhost:5000/jobs/filter");
      const data = await response.json();
      setjoboffers(data);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

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
