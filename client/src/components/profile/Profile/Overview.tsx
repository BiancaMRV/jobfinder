import styles from "./Overview.module.css";
import { Briefcase, Pencil, GraduationCap } from "lucide-react";

export default function Overview() {
  return (
    <div className={styles.overviewcontainer}>
      <div className={styles.experience}>
        <Briefcase size={24} />
        <span> Experience </span>
        <Pencil size={24} />
        <div className={styles.inputcontainerexperience}>
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
          <div className={styles.inputdescriptionexperience}>
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
      <div className={styles.education}>
        <GraduationCap size={24} />
        <span> Education </span>
        <Pencil size={24} />
        <div className={styles.inputcontainereducation}>
          <input
            className={styles.inputtitle}
            type="title"
            id="title"
            name="title"
            placeholder="CourseName"
            required
          />
          <input
            className={styles.inputdateandinstitution}
            type="title"
            id="title"
            name="title"
            placeholder="Institution And Date"
            required
          />
          <input
            className={styles.inputdescriptioneducation}
            type="description"
            id="description"
            name="description"
            placeholder="Description"
            maxLength={100}
            required
          />
        </div>
      </div>
      <div className={styles.documents}>
        <span> Documents </span>
      </div>
    </div>
  );
}
