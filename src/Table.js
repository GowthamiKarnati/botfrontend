// Table.js
import React from "react";

const Table = ({ data }) => {
  const tableContent = data.map((item, index) => (
    <tr key={index}>
      {Object.values(item).map((value, i) => (
        <td key={i}>{value}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>
          {Object.keys(data[0]).map((key, index) => (
            <th key={index}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>{tableContent}</tbody>
    </table>
  );
};

export default Table;
