import styles from "./Searchbar.module.css";
import { Search, Map } from "lucide-react";

export default function Searchbar() {
  return (
    <div className={styles.searchbar}>
      <div className={styles.leftsearchbar}>
        <Search size={24} color="grey" />

        <input
          className={styles.input}
          type="text"
          id="Job title or keyword"
          placeholder="Job title or keyword"
          minLength={5}
        />
      </div>

      <div className={styles.rightsearchbar}>
        <Map size={24} color="grey" />

        <input
          className={styles.input}
          type="text"
          id="Add city or zip-code"
          placeholder="Add city or zip-code"
          minLength={2}
        />
      </div>
      <button className={styles.button}>Search</button>
    </div>
  );
}
