import React from "react";

const Filter = ({ value, handleFilterChange }) => (
  <div>
    filter shown with{" "}
    <input type="text" value={value} onChange={handleFilterChange} />
  </div>
);

export default Filter;
