import { useMemo, useState } from "react";
import MonthlyExpenseTable from "../components/MonthlyExpenseTable";

export default function MonthlyExpenses({ expenses, branches, categories }) {
  const currentYear = new Date().getFullYear();

  const [selectedBranchId, setSelectedBranchId] = useState("All");
  const [selectedYear, setSelectedYear] = useState(String(currentYear));

  const availableYears = useMemo(() => {
    const years = expenses.map((expense) =>
      new Date(expense.date).getFullYear(),
    );

    const uniqueYears = [...new Set(years)];

    if (!uniqueYears.includes(currentYear)) {
      uniqueYears.push(currentYear);
    }

    return uniqueYears.sort((a, b) => b - a);
  }, [expenses, currentYear]);

  const MonthlyExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const expenseYear = new Date(expense.date).getFullYear();

      if (expenseYear !== Number(selectedYear)) {
        return false;
      }

      if (selectedBranchId === "All") {
        return true;
      }

      return Number(expense.branchId) === Number(selectedBranchId);
    });
  }, [expenses, selectedBranchId, selectedYear]);

  const employeeCount = useMemo(() => {
    if (selectedBranchId === "All") {
      return branches.reduce(
        (total, branch) => total + Number(branch.employees),
        0,
      );
    }

    const selectedBranch = branches.find(
      (branch) => Number(branch.id) === Number(selectedBranchId),
    );

    return selectedBranch ? Number(selectedBranch.employees) : 0;
  }, [branches, selectedBranchId]);

  const selectedBranchName = useMemo(() => {
    if (selectedBranchId === "All") {
      return "All Branches";
    }
    const branch = branches.find(
      (branch) => Number(branch.id) === Number(selectedBranchId),
    );

    return branch ? branch.name : "Unknown Branch";
  }, [branches, selectedBranchId]);

  const clearFilters = () => {
    setSelectedYear(currentYear);
    setSelectedBranchId("All");
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Monthly Expenses</h2>
          <p>View expenses by month, category, and branch</p>
        </div>
      </div>

      <div className="card-monthly-filter-card">
        <div className="monthly-filter-grid">
          <div className="form-group">
            <label>Branch</label>
            <select
              value={selectedBranchId}
              onChange={(event) => setSelectedBranchId(event.target.value)}
            >
              <option value="All">All Branches</option>

              {branches.map((branch) => (
                <option value={branch.id} key={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Year</label>
            <select
              value={selectedYear}
              onChange={(event) => setSelectedYear(event.target.value)}
            >
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button onClick={clearFilters}>Clear Filters</button>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <h3>{selectedBranchName}</h3>
            <p>Monthly expense breakdown for {selectedYear}</p>

            <MonthlyExpenseTable
              expenses={MonthlyExpenses}
              categories={categories}
              employeeCount={employeeCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
