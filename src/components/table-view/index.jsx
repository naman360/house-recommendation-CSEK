import React, { useEffect, useState } from "react";
import styles from "./table.module.css";

const TableView = ({
  numRows,
  numCols,
  showTable,
  setRecommendedHouse,
  setFixed,
  fixed,
}) => {
  const [cellValues, setCellValues] = useState([]);
  const [isTableEditable, setIsTableEditable] = useState(true);
  const [tableContents, setTableContents] = useState([]);

  useEffect(() => {
    createTable();
  }, [numRows, numCols, cellValues, isTableEditable]);

  const createTable = () => {
    let table = [];
    for (let i = 0; i < numRows; i++) {
      let children = [];
      for (let j = 0; j < numCols; j++) {
        children.push(
          <td
            data-value={cellValues[i] && cellValues[i][j] ? "house" : "-"}
            className={styles.tableData}
          >
            {!isTableEditable ? (
              cellValues[i] && cellValues[i][j] ? (
                cellValues[i][j]
              ) : (
                "-"
              )
            ) : (
              <input
                type="text"
                className={styles.inputBox}
                value={
                  cellValues[i] && cellValues[i][j] ? cellValues[i][j] : ""
                }
                onChange={(e) => {
                  let newCellValues = [...cellValues];
                  if (!newCellValues[i]) {
                    newCellValues[i] = [];
                  }
                  newCellValues[i][j] = e.target.value;
                  setCellValues(newCellValues);
                }}
              />
            )}
          </td>
        );
      }
      table.push(<tr className={styles.tableRow}>{children}</tr>);
    }
    setTableContents(table);
  };

  const parseTable = () => {
    let table = document.getElementById("plot-area");
    let arr = [];
    for (let i = 0; i < numRows; i++) {
      let smallarr = [];
      for (let j = 0; j < numCols; j++) {
        smallarr.push(table.rows[i].cells[j].innerHTML);
      }
      arr.push(smallarr);
      smallarr = [];
    }

    return arr;
  };

  const recommendHouse = () => {
    let parsedTable = parseTable();

    let rows = parsedTable?.length;
    let cols = parsedTable[0]?.length;
    let gym = [];
    let restaurant = [];
    let hospital = [];
    let houses = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (parsedTable[i][j]?.toLowerCase().includes("gym")) {
          gym = [i, j];
        }
        if (parsedTable[i][j]?.toLowerCase().includes("restaurant")) {
          restaurant = [i, j];
        }
        if (parsedTable[i][j]?.toLowerCase().includes("hospital")) {
          hospital = [i, j];
        }
        if (parsedTable[i][j]?.toLowerCase().includes("house")) {
          houses.push([i, j]);
        }
      }
    }

    let disArray = Array(houses.length).fill(Infinity);
    for (let i = 0; i < houses.length; i++) {
      disArray[i] = Math.min(
        disArray[i],
        calculateDistance(houses[i], gym) +
          calculateDistance(houses[i], hospital) +
          calculateDistance(houses[i], restaurant)
      );
    }

    let minIndex = 0;

    for (let i = 1; i < disArray.length; i++) {
      if (disArray[i] < disArray[minIndex]) {
        minIndex = i;
      }
    }

    setRecommendedHouse(parsedTable[houses[minIndex][0]][houses[minIndex][1]]);
  };

  const calculateDistance = (house, service) => {
    if (service.length === 0) return 0;
    let dx = Math.abs(house[0] - service[0]);
    let dy = Math.abs(house[1] - service[1]);
    return dx + dy;
  };

  const handleSetTable = () => {
    setIsTableEditable(false);
    setFixed(true);
  };

  const handleEditTable = () => {
    setIsTableEditable(true);
    setFixed(false);
  };

  return (
    <div className={styles.tableViewContainer}>
      {showTable && (
        <>
          <div className={styles.buttonGroup}>
            <button className={styles.button} onClick={handleSetTable}>
              Set Table
            </button>
            <button
              className={styles.button}
              onClick={recommendHouse}
              disabled={!fixed}
            >
              Recommend Best House
            </button>
            <button className={styles.button} onClick={handleEditTable}>
              Edit Table
            </button>
          </div>
          <div className={styles.tableContainer}>
            <table id="plot-area" className={styles.table}>
              <tbody>{tableContents}</tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};
export default TableView;
