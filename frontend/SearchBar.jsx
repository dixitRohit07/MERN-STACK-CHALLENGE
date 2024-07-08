// // SearchBar.js

// import React from 'react';

// const SearchBar = ({ value, onChange }) => {
//   return (
//     <input
//       type="text"
//       placeholder="Search transactions..."
//       value={value}
//       onChange={onChange}
//     />
//   );
// };

// export default SearchBar;

// SearchBar.jsx

import React from 'react';

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search transactions..."
      value={value}
      onChange={onChange}
    />
  );
};

export default SearchBar;