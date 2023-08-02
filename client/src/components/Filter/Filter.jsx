const Filter = ({ filters, setFilters }) => {
  return (
    <div className="pet-filter-container">
      <div className="filter-container">
        <label htmlFor="favourite">Favourite</label>
        <select
          name="favourite"
          id="favourite"
          className="form-select"
          onChange={(e) => {
            setFilters((prev) => ({ ...prev, favourite: e.target.value }));
          }}
        >
          <option value="any">Any</option>
          <option value="favourite">Favourite</option>
          <option value="not favourite">Not Favourite</option>
        </select>
      </div>
      <div className="filter-container">
        <label htmlFor="gender">Gender</label>
        <select
          name="gender"
          id="gender"
          className="form-select"
          // value={filters.gender}
          onChange={(e) => {
            setFilters((prev) => ({ ...prev, gender: e.target.value }));
          }}
        >
          <option value="any">Any</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
