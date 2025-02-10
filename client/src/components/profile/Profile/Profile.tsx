import styles from "./Profile.module.css";
import { CircleUser } from "lucide-react";

export function Profile() {
  return (
    <div className={styles.profilecontainer}>
      <CircleUser color="#6e54b5" size={100} />
    </div>
  );
}
