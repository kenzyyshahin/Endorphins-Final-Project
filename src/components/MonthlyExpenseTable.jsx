export default function MonthlyExpenseTable({
  expenses,
  categories,
  employeeCount,
}) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthNumbers = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  // calculate the total for one category in one month
  const getCategoryMonthTotal = (category, month) => {
    const monthNumber = monthNumbers[month];

    return expenses
      .filter((expense) => {
        const expenseDate = new Date(expense.date);
        const expenseMonth = expenseDate.getMonth();
        return expense.category === category && expenseMonth === monthNumber;
      })
      .reduce(
        (sum, expense) =>
          sum + Number(expense.price) * Number(expense.quantity),
        0,
      );
  };

  //calculate total for a month
  const getMonthTotal = (month) => {
    return categories.reduce(
      (total, category) => total + getCategoryMonthTotal(category, month),
      0,
    );
  };

  // calculate grand total
  const grandTotal = months.reduce(
    (total, month) => total + getMonthTotal(month),
    0,
  );

  return (
    <div className="monthly-expense-table">
      <div className="monthly-expense-header">
        <div>
          <h3>Monthly Expenses</h3>
          <p>Expense breakdown by category and month</p>
        </div>
      </div>

      <div className="monthly-table-container">
        <table className="monthly-expense-table">
          <colgroup>
            <col className="category-column" />
            {months.map((month) => (
              <col className="month-column" key={`${month}-column`} />
            ))}
            <col className="total-column" />
          </colgroup>
          <thead>
            <tr>
              <th className="category-column">Category</th>

              {months.map((month) => (
                <th key={month}>{month}</th>
              ))}

              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => {
              const categoryTotal = months.reduce(
                (total, month) =>
                  total + getCategoryMonthTotal(category, month),
                0,
              );

              return (
                <tr key={category}>
                  <td className="category-name">{category}</td>

                  {months.map((month) => {
                    const value = getCategoryMonthTotal(category, month);
                    return (
                      <td key={month}>
                        {value > 0 ? value.toLocaleString() : ""}
                      </td>
                    );
                  })}
                  <td className="row-total">
                    {categoryTotal > 0 ? categoryTotal.toLocaleString() : ""}
                  </td>
                </tr>
              );
            })}

            <tr className="monthly-total-row">
              <td>Monthly Total</td>
              {months.map((month) => {
                const total = getMonthTotal(month);
                return (
                  <td key={month}>{total > 0 ? total.toLocaleString() : "0"}</td>
                );
              })}

              <td>{grandTotal.toLocaleString()}</td>
            </tr>

            <tr className="employees-row">
              <td>No. of Employees</td>
              <td colSpan="12">{employeeCount}</td>
              <td>{employeeCount}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
