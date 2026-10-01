export default function ExpenseTable({
  expenses,
  branches,
  showDelete = false,
  showEdit = false,
  onDelete,
  onEdit,
}) {
  const getBranchName = (branchId) => {
    const branch = branches.find(
      (branch) => Number(branch.id) === Number(branchId),
    );

    return branch ? branch.name : "Unknown Branch";
  };

  const getExpenseTotal = (expense) => {
    return Number(expense.price) * Number(expense.quantity);
  };

  return (
    <div className="expense-table-container">
      <table className="expense-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Item</th>
            <th>Category</th>
            <th>Branch</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th>Notes</th>

            {(showEdit || showDelete) && <th>Action</th>}
          </tr>
        </thead>

        <tbody>
          {expenses.length === 0 ? (
            <tr>
              <td
                colSpan={showEdit || showDelete ? 9 : 8}
                className="empty-table"
              >
                No expenses found
              </td>
            </tr>
          ) : (
            expenses.map((expense) => {
              const total = getExpenseTotal(expense);

              return (
                <tr key={expense.id}>
                  <td>{expense.date}</td>
                  <td>
                    <strong>{expense.item}</strong>
                  </td>
                  <td>
                    <span className="category-badge">{expense.category}</span>
                  </td>

                  <td>{getBranchName(expense.branchId)}</td>

                  <td>{Number(expense.quantity).toLocaleString()}</td>
                  <td>{Number(expense.price).toLocaleString()} EGP</td>
                  <td>
                    <strong>{total.toLocaleString()} EGP</strong>
                  </td>

                  <td>{expense.notes || "-"}</td>

                  {(showEdit || showDelete) && (
                    <td>
                      {showEdit && (
                        <button
                          className="edit-btn"
                          onClick={() => onEdit(expense)}
                        >
                          Edit
                        </button>
                      )}

                      {showDelete && (
                        <button
                          className="delete-btn"
                          onClick={() => onDelete(expense.id)}
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
