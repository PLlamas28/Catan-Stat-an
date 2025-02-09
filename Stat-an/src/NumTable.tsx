import React, { useState, useEffect } from 'react';
import './NumTable.css';

interface TableProps {
    headers: string[];
    data: string[][];
}

type DiceProbabilities = {
    [key: number]: number;
  };
  

const NumTable: React.FC<TableProps> = ({ headers,data }) => {
  const [tableData, setTableData] = useState(data);
  const [expPts, setExpPts] = useState(0);

  const diceProbabilities: DiceProbabilities = {
    0: 0,        // just so i don't get NaN
    2: 1 / 36,   // 1 possible way (1,1)
    3: 2 / 36,   // 2 possible ways (1,2), (2,1)
    4: 3 / 36,   // 3 possible ways (1,3), (2,2), (3,1)
    5: 4 / 36,   // 4 possible ways (1,4), (2,3), (3,2), (4,1)
    6: 5 / 36,   // 5 possible ways (1,5), (2,4), (3,3), (4,2), (5,1)
    7: 6 / 36,   // 6 possible ways (1,6), (2,5), (3,4), (4,3), (5,2), (6,1)
    8: 5 / 36,   // 5 possible ways (2,6), (3,5), (4,4), (5,3), (6,2)
    9: 4 / 36,   // 4 possible ways (3,6), (4,5), (5,4), (6,3)
    10: 3 / 36,  // 3 possible ways (4,6), (5,5), (6,4)
    11: 2 / 36,  // 2 possible ways (5,6), (6,5)
    12: 1 / 36   // 1 possible way (6,6)
  };

  const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
    const newData = tableData.map((row, rIndex) =>
      row.map((cell, cIndex) => (rIndex === rowIndex && cIndex === colIndex ? value : cell))
    );
    setTableData(newData);
  };

  const addRow = () => {
    const newRow = Array(tableData[0].length).fill(''); // create a new row with empty cells
    setTableData([...tableData, newRow]);
  };
  useEffect(() => {
    setExpPts(0)
    tableData.map((row) => {
        const leftValue = parseFloat(row[0]) || 0;
        const rightValue = parseFloat(row[1]) || 0;
        setExpPts((prevPts)=> prevPts + diceProbabilities[leftValue]*rightValue);
        return leftValue * rightValue;
      });


  }, [tableData])
  /* const calculateExpectedProbability = () => {
    const probabilities = tableData.map((row) => {
      const leftValue = parseFloat(row[0]) || 0;
      const rightValue = parseFloat(row[1]) || 0;
      setExpPts((prevPts) => prevPts+leftValue*rightValue);
      return leftValue * rightValue;
    });
    
    //return probabilities;
  }; */

  //const expectedProbabilities = calculateExpectedProbability(); // this is just an array of numbers

  return (
    <div className='divAboveTable'>
      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          ))}

            {/* {expectedProbabilities.map((prob, rowIndex) => (
                <tr key={rowIndex}>
                <td>{prob}</td>
                </tr> 
                // setExpPts(prevPts => prevPts+prob);
            ))}*/}

        </tbody>
      </table>
      <div>
        Expected Resources per Turn: {expPts}
      </div>
      <button onClick={addRow}>Add Row</button>
    </div>
  );
};

export default NumTable;
