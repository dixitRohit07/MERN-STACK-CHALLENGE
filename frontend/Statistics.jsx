// // Statistics.jsx

// import React from 'react';

// const Statistics = ({ stats }) => {
//   return (
//     <div className="statistics">
//       <div className="stat-box">
//         <h3>Total Sales Amount:</h3>
//         <p>${stats.totalSales.toFixed(2)}</p>
//       </div>
//       <div className="stat-box">
//         <h3>Total Sold Items:</h3>
//         <p>{stats.totalSoldItems}</p>
//       </div>
//       <div className="stat-box">
//         <h3>Total Not Sold Items:</h3>
//         <p>{stats.totalNotSoldItems}</p>
//       </div>
//     </div>
//   );
// };

// export default Statistics;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Statistics = () => {
//     const [selectedMonth, setSelectedMonth] = useState('March'); // Default selected month
//     const [statistics, setStatistics] = useState({
//         totalSaleAmount: 0,
//         totalSoldItems: 0,
//         totalNotSoldItems: 0
//     });
//     const [error, setError] = useState(null);

//     const fetchStatistics = async (month) => {
//         try {
//             const response = await axios.get(`/api/statistics?month=${month}`);
//             setStatistics(response.data);
//         } catch (error) {
//             setError(error.message); // Handle and log the error
//         }
//     };

//     useEffect(() => {
//         fetchStatistics(selectedMonth);
//     }, [selectedMonth]); // Fetch statistics whenever selectedMonth changes

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     return (
//         <div>
//             <h2>Statistics for {selectedMonth}</h2>
//             <div>
//                 <p>Total Sale Amount: ${statistics.totalSaleAmount.toFixed(2)}</p>
//                 <p>Total Sold Items: {statistics.totalSoldItems}</p>
//                 <p>Total Not Sold Items: {statistics.totalNotSoldItems}</p>
//             </div>
//             {/* Add additional styling or components as needed */}
//         </div>
//     );
// };

// export default Statistics;




//Statistics.js

import React, { useState, useEffect } from 'react';

const Statistics = ({ selectedMonth }) => {
  const [stats, setStats] = useState({ totalSales: 0, totalSoldItems: 0, totalNotSoldItems: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      setLoading(true);
      try {
        // const response = await fetch(`http://localhost:5000/api/statistics?month=${selectedMonth}`);
        const response = await fetch(`http://localhost:5000/api/statistics?month=${selectedMonth}`);
        const data = await response.json();
        setStats(data); 
      } catch (error) {
        console.error('Error fetching statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedMonth) {
      fetchStatistics();
    }
  }, [selectedMonth]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="statistics-box">
      <div className="stat-item">
        <h3>Total Sales Amount:</h3>
        <p>${stats.totalSales}</p>
      </div>
      <div className="stat-item">
        <h3>Total Sold Items:</h3>
        <p>{stats.totalSoldItems}</p>
      </div>
      <div className="stat-item">
        <h3>Total Not Sold Items:</h3>
        <p>{stats.totalNotSoldItems}</p>
      </div>
    </div>
  );
};

export default Statistics;


