import React from "react";
import styles from "./grid.module.css";
const Grid = ({
  setNumRows,
  setNumCols,
  setShowTable,
  recommendedHouse,
  fixed,
  setFixed,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowTable(true);
    setFixed(false);
  };

  const handleRowsChange = (e) => {
    setNumRows(e.target.value);
  };

  const handleColsChange = (e) => {
    setNumCols(e.target.value);
  };

  return (
    <div className={styles.gridContainer}>
      <form
        type="submit"
        className={styles.formContainer}
        onSubmit={handleSubmit}
      >
        <div className={`${styles.inputContainer}`}>
          <span className={`${styles.inputLabel}`}>Enter number of rows:</span>
          <input
            disabled={fixed}
            type="number"
            onChange={handleRowsChange}
            max="20"
            required
          />
        </div>
        <div className={`${styles.inputContainer}`}>
          <span className={`${styles.inputLabel}`}>
            Enter number of columns:
          </span>
          <input
            disabled={fixed}
            type="number"
            onChange={handleColsChange}
            max="20"
            required
          />
        </div>
        <button disabled={fixed} className={styles.button} type="submit">
          Create
        </button>
      </form>
      {recommendedHouse && (
        <div className={styles.answerBox}>
          Recommended House: <br />
          <span className={styles.answerText}> {recommendedHouse}</span>
        </div>
      )}
    </div>
  );
};

export default Grid;
