// components/DynamicTable.js

import React from 'react';

function DynamicTable({ data }) {
  if (!data) return null;

  return (
    <table>
      <thead>
        <tr>
          <th>Field</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(data).map((key, index) => (
          <tr key={index}>
            <td>{key}</td>
            <td>{data[key]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DynamicTable;
