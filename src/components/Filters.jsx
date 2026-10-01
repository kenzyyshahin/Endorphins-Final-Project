export default function Filters({
  filters,
  setFilters,
  branches,
  categories,
  branchLocked = false,
}) {
  const handleSearchChange = (event) => {
    setFilters({ ...filters, search: event.target.value });
  };

  const handleBranchChange = (event) => {
    setFilters({ ...filters, branch: event.target.value });
  };
  const handleCategoryChange = (event) => {
    setFilters({ ...filters, category: event.target.value });
  };

  const handleReset = () => {
    setFilters({ branch: "All", category: "All", search: "" });
  };
  return (
    <div className="card filters-card">
      <div className="filters">
        <div className="filter-group search-group">
          <label>Search</label>
          <input
            type="text"
            placeholder="Search expense item..."
            value={filters.search}
            onChange={handleSearchChange}
          />
        </div>

        <div className="filter-group">
          <label>Branch</label>
          <select
            value={filters.branch}
            onChange={handleBranchChange}
            disabled={branchLocked}
          >
            <option value="All">All Branches</option>

            {branches.map((branch) => (
              <option value={branch.id} key={branch.id}>
                {branch.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Category</label>
          <select value={filters.category} onChange={handleCategoryChange}>
            <option value="All">All Categories</option>

            {categories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-actions">
          <button className="secondary-btn" type="button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
