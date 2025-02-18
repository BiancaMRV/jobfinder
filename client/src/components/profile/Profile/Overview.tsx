import styles from "./Overview.module.css";
import { Briefcase, Pencil } from "lucide-react";

export default function Overview() {
  return (
    <div className={styles.overviewcontainer}>
      <div className={styles.experience}>
        <Briefcase size={24} />
      </div>
    </div>
  );
}
