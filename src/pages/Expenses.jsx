import { useMemo } from "react";
import ExpenseTable from "../components/ExpenseTable";
import Filters from "../components/Filters";

export default function Expenses({
  expenses,
  branches,
  categories,
  filters,
  setFilters,
  branchLocked = false,
  onDelete,
  onEdit,
}) {
  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      //branch filter
      const matchesBranch =
        filters.branch === "All" ||
        Number(expense.branchId) === Number(filters.branch);

      // category filter
      const matchesCategory =
        filters.category === "All" || expense.category === filters.category;

      //search filter
      const search = filters.search?.toLowerCase().trim() || "";
      const matchesSearch =
        !search || expense.item?.toLowerCase().includes(search);

      return matchesBranch && matchesCategory && matchesSearch;
    });
  }, [expenses, filters]);
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Expenses</h2>
          <p>View and manage individual expense records</p>
        </div>
      </div>

      <Filters
        filters={filters}
        setFilters={setFilters}
        branches={branches}
        categories={categories}
        branchLocked={branchLocked}
      />

      <div className="card">
        <div className="card-header">
          <div>
            <h3>Expense Records</h3>
            <p>
              {filteredExpenses.length} record{" "}
              {filteredExpenses.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <ExpenseTable
          expenses={filteredExpenses}
          branches={branches}
          categories={categories}
          showEdit={true}
          showDelete={true}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </div>
    </div>
  );
}
