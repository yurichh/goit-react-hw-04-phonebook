import React from 'react';

const Filter = ({ handleFilter }) => {
  return (
    <>
      <label htmlFor="filter" className="filter-label">
        Find contacts by name
      </label>
      <input
        type="text"
        name="filter"
        className="filter-input"
        onChange={handleFilter}
      />
    </>
  );
};

export default Filter;
