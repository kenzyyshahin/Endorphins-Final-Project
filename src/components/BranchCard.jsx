export default function BranchCard({
  branch,
  todayExpenses,
  onEdit,
  onDelete,
}) {
  const total = todayExpenses.reduce(
    (sum, expense) => sum + Number(expense.price) * Number(expense.quantity),
    0,
  );

  const costPerPerson =
    Number(branch.employees) > 0 ? total / Number(branch.employees) : 0;
  return (
    <div className="branch-card">
      <div className="branch-card-header">
        <div>
          <h3>{branch.name}</h3>
          <p>{branch.employees} employees</p>
        </div>

        <div className="branch-actions">
          <button className="edit-btn" onClick={() => onEdit(branch)}>
            Edit
          </button>

          <button className="delete-btn" onClick={() => onDelete(branch.id)}>
            Delete
          </button>
        </div>
      </div>

      <div className="branch-card-stats">
        <div>
          <span>Today's Expenses</span>
          <strong>{total.toLocaleString()} EGP</strong>
        </div>

        <div>
          <span>Cost / Employee</span>
          <strong>
            {costPerPerson.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}{" "}
            EGP
          </strong>
        </div>
      </div>

      <div className="branch-card-footer">
        <span>
          {todayExpenses.length} transaction{" "}
          {todayExpenses.length !== 1 ? "s" : ""} today
        </span>
      </div>
    </div>
  );
}
