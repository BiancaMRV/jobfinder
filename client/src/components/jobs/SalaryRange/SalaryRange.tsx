import styles from "./SalaryRange.module.css";
import { useState } from "react";

export default function SalaryRange() {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  return (
    <div className={styles.rangecontainer}>
      <input
        className={styles.input}
        type="number"
        id="min"
        value={min}
        placeholder="Min"
        onChange={(e) => setMin(e.target.value)}
      />
      <span className={styles.span}>-</span>
      <input
        className={styles.input}
        type="number"
        id="max"
        value={max}
        placeholder="Max"
        onChange={(e) => setMax(e.target.value)}
      />
      <button type="submit" className={styles.button}>
        OK
      </button>
    </div>
  );
}
// TODO: validation, error handling, and submit functionality
