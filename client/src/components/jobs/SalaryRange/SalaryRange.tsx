import styles from "./SalaryRange.module.css";
import { FilterComponentProps } from "../types";

export const SalaryRange: React.FC<FilterComponentProps> = ({
  filters,
  onFilterChange,
}) => {
  const handleInputChange = (type: "min" | "max", value: string) => {
    const numValue = value === "" ? 0 : parseInt(value.replace(/[^0-9]/g, ""));
    const newRange: [number, number] = [...filters.salaryRange];
    // TODO : PERCEBER ISTO PARSEINT

    if (type === "min") {
      newRange[0] = numValue;
      if (numValue > newRange[1]) {
        newRange[1] = numValue;
      }
    } else {
      newRange[1] = numValue;
      if (numValue < newRange[0]) {
        newRange[0] = numValue;
      }
    }

    onFilterChange("salaryRange", newRange);
  };

  return (
    <div className={styles.rangecontainer}>
      <h4>Salary Range</h4>
      <input
        className={styles.input}
        type="number"
        id="min"
        value={filters["salaryRange"][0]}
        placeholder="Min"
        onChange={(e) => handleInputChange("min", e.target.value)}
      />

      {/* <input
        className={styles.input}
        type="number"
        id="max"
        value={filters["salaryRange"][1]}
        placeholder="Max"
        onChange={(e) => handleInputChange("max", e.target.value)}
      /> */}
    </div>
  );
};
// TODO: validation, error handling, and submit functionality
