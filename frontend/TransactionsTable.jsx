// // TransactionsTable.js

// import React from 'react';

// const TransactionsTable = ({ transactions }) => {
//   return (
//     <div className="transactions-table">
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Price</th>
//             <th>Category</th>
//             <th>Sold</th>
//             {/* <th>Date of Sale</th> */}
//             <th>Image</th>
//           </tr>
//         </thead>
//         <tbody>
//           {transactions.map(transaction => (
//             <tr key={transaction._id}>
//               <td>{transaction.id}</td>
//               <td>{transaction.title}</td>
//               <td>{transaction.description}</td>
//               <td>{transaction.price.toFixed(2)}</td>
//               <td>{transaction.category}</td>
//               <td>{transaction.sold ? 'true' : 'false'}</td>
//               {/* <td>{transaction.dateOfSale}</td> */}
//               <td>{transaction.image}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TransactionsTable;


// TransactionsTable.jsx

import React from 'react';

const TransactionsTable = ({ transactions }) => {
  return (
    <div className="transactions-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>${transaction.price.toFixed(2)}</td>
              <td>{transaction.category}</td>
              <td>{transaction.sold ? 'true' : 'false'}</td>
              <td><img src={transaction.image} alt={transaction.title} width="50" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
