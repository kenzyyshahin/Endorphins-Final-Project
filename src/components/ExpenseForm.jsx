const categories = [
  "Food",
  "Transportation",
  "Office Supplies",
  "Utilities",
  "other",
];

export default function ExpenseForm({
  form,
  setForm,
  branches,
  onSubmit,
  onCancel,
  submitText = "Add Expense",
  user,
}) {
  const updateForm = (name, value) => {
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const total = Number(form.quantity || 0) * Number(form.price || 0);

  const isOfficeAdmin = user?.role === "office_admin";
  const userBranch = branches.find((branch) => branch.id === user?.officeId);

  return (
    <form className="expense-form" onSubmit={onSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label>Item Name *</label>
          <input
            type="text"
            placeholder="e.g. Printer Paper"
            value={form.item}
            onChange={(e) => updateForm("item", e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Category *</label>
          <select
            value={form.category}
            onChange={(e) => updateForm("category", e.target.value)}
            required
          >
            <option value="">Select category</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Branch *</label>

          {isOfficeAdmin ? (
            <>
              <input
                type="text"
                value={userBranch?.name || "Assigned Office"}
                disabled
              />
              <input
                type="hidden"
                name="branchId"
                value={user?.officeId || ""}
              />
            </>
          ) : (
            <select
              value={form.branchId}
              onChange={(e) => updateForm("branchId", Number(e.target.value))}
              required
            >
              <option value="">Select Branch</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="form-group">
          <label>Quantity *</label>
          <input
            type="number"
            min="1"
            value={form.quantity}
            onChange={(e) => updateForm("quantity", Number(e.target.value))}
            required
          />
        </div>

        <div className="form-group">
          <label>Price per Item (EGP) *</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={(e) => updateForm("price", e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Date *</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => updateForm("date", e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Notes *</label>
          <textarea
            placeholder="Additional information..."
            value={form.notes}
            onChange={(e) => updateForm("notes", e.target.value)}
          ></textarea>
        </div>

        <div className="form-actions">
          <div className="form-total">
            <span>Estimated total</span>
            <strong>{total.toLocaleString()} EGP</strong>
          </div>

          {onCancel && (
            <button className="close-button" type="button" onClick={onCancel}>
              Cancel
            </button>
          )}

          <button className="add-button" type="submit">
            {submitText}
          </button>
        </div>
      </div>
    </form>
  );
}
