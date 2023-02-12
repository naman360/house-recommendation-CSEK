import React, { useState } from "react";
import Grid from "../grid";
import TableView from "../table-view";
import styles from "./view.module.css";
const View = () => {
  const [numRows, setNumRows] = useState(0);
  const [numCols, setNumCols] = useState(0);
  const [showTable, setShowTable] = useState(false);
  const [recommendedHouse, setRecommendedHouse] = useState(null);
  const [fixed, setFixed] = useState(false);
  return (
    <div className={styles.viewContainer}>
      <Grid
        setNumRows={setNumRows}
        setNumCols={setNumCols}
        setShowTable={setShowTable}
        recommendedHouse={recommendedHouse}
        setFixed={setFixed}
        fixed={fixed}
      />

      <TableView
        numRows={numRows}
        numCols={numCols}
        showTable={showTable}
        fixed={fixed}
        setFixed={setFixed}
        setRecommendedHouse={setRecommendedHouse}
      />
    </div>
  );
};
export default View;
