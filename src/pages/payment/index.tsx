// pages/index.js

import React, { useState } from 'react';
import DynamicTable from '../../components/Payment/DynamicTable';

export default function Home() {
  const [responseData, setResponseData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/paynow', {
        method: 'POST'
        // You can add headers if needed
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setResponseData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Dynamic Table</h1>
      <button onClick={fetchData}>Fetch Data</button>
      {responseData && <DynamicTable data={responseData} />} {/* Pass 'data' prop instead of 'responseData' */}
    </div>
  );
}
