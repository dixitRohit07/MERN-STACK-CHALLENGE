// // Pagination.js

// import React from 'react';

// const Pagination = ({ currentPage, totalPages, onNext, onPrevious }) => {
//   return (
//     <div className="pagination">
//       <button onClick={onPrevious} disabled={currentPage === 1}>Previous</button>
//       <span>Page {currentPage} of {totalPages}</span>
//       <button onClick={onNext} disabled={currentPage === totalPages}>Next</button>
//     </div>
//   );
// };

// export default Pagination;

// Pagination.jsx

import React from 'react';

const Pagination = ({ currentPage, totalPages, onNext, onPrevious }) => {
  return (
    <div className="pagination">
      <button onClick={onPrevious} disabled={currentPage === 1}>Previous</button>
      <span>Page {currentPage} of {totalPages}</span>
      <button onClick={onNext} disabled={currentPage === totalPages}>Next</button>
    </div>
  );
};

export default Pagination;