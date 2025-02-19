import styles from "./Overview.module.css";
import { Briefcase, Pencil } from "lucide-react";

export default function Overview() {
  return (
    <div className={styles.overviewcontainer}>
      <div className={styles.experience}>
        <Briefcase size={24} />
        <span> Experience </span>
        <Pencil size={24} />
      </div>
      <div className={styles.inputcontaineroverview}>
        <div className={styles.inputtilte}>
          <input
            type="title"
            id="title"
            name="title"
            placeholder="Title"
            required
          />
        </div>
        <div className={styles.inputdateandcompany}>
          <input
            type="date and name of company"
            id="date and name of company"
            name="date and name of company"
            placeholder="Date and Name of Company"
            required
          />
        </div>
        <div className={styles.inputdescription}>
          <input
            type="description"
            id="description"
            name="description"
            placeholder="Description"
            maxLength={100}
            required
          />
        </div>
      </div>
    </div>
  );
}
