import styles from "./SalaryRangeSlider.module.css";

export default function SalaryRangeSlider() {
  return (
    <div className={styles.rangecontainer}>
      <input
        className={styles.input}
        type="number"
        id="min"
        value="min"
        placeholder="Min"
      />
      <span className={styles.span}>-</span>\
      <input
        className={styles.input}
        type="number"
        id="max"
        value="Max"
        placeholder="Max"
      />
      <button type="submit" className={styles.button}>
        OK
      </button>
    </div>
  );
}
