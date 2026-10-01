import { useState } from "react";
import BranchCard from "../components/BranchCard";
import StatCard from "../components/StatCard";

export default function Branches({
  branches,
  expenses,
  onAddBranch,
  onEditBranch,
  onDeleteBranch,
}) {
  const [showForm, setShowForm] = useState(false);
  const [editingBranchId, setEditingBranchId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    employees: "",
  });
  const [errors, setErrors] = useState({});

  const today = new Date().toISOString().split("T")[0];
  const todayExpenses = expenses.filter((expense) => expense.date === today);

  const totalToday = todayExpenses.reduce(
    (sum, expense) => sum + Number(expense.price) * Number(expense.quantity),
    0,
  );

  const totalEmployees = branches.reduce(
    (sum, branch) => sum + Number(branch.employees || 0),
    0,
  );

  const getBranchExpenses = (branchId) => {
    return todayExpenses.filter(
      (expense) => Number(expense.branchId) === Number(branchId),
    );
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Branch name is required.";
    }

    if (!form.employees) {
      newErrors.employees = "Number of employees is required.";
    } else if (
      !Number.isInteger(Number(form.employees)) ||
      Number(form.employees) < 1
    ) {
      newErrors.employees = "Employees must be a whole number greater than 0.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setForm({ name: "", employees: "" });
    setErrors({});
    setEditingBranchId(null);
    setShowForm(false);
  };

  const handleEdit = (branch) => {
    setEditingBranchId(branch.id);
    setForm({ name: branch.name, employees: String(branch.employees) });
    setErrors({});
    setShowForm(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const branchData = {
      name: form.name.trim(),
      employees: Number(form.employees),
    };

    if (editingBranchId !== null) {
      onEditBranch({
        id: editingBranchId,
        ...branchData,
      });
    } else {
      onAddBranch(branchData);
    }

    resetForm();
  };

  const handleNameChange = (event) => {
    const value = event.target.value;
    setForm((prev) => ({ ...prev, name: value }));
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
  };

  const handleEmployeesChange = (event) => {
    const value = event.target.value;
    setForm((prev) => ({ ...prev, employees: value }));
    if (errors.employees) {
      setErrors((prev) => ({ ...prev, employees: "" }));
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Branches</h2>
          <p>Manage branches and view today's expenses</p>
        </div>

        <button
          className="primary-btn"
          onClick={() => {
            setShowForm(true);
            setEditingBranchId(null);
            setErrors({});
            setForm({ name: "", employees: "" });
          }}
        >
          + Add Branch
        </button>
      </div>

      {showForm && (
        <div className="card branch-form">
          <h3>{editingBranchId !== null ? "Edit Branch" : "Add New Branch"}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Branch Name</label>
              <input
                type="text"
                placeholder="Example: Branch 4"
                value={form.name}
                className={errors.name ? "input-error" : ""}
                onChange={handleNameChange}
              />

              {errors.name && <p className="field-error">{errors.name}</p>}
            </div>

            <div className="form-group">
              <label>Number of Employees</label>
              <input
                type="number"
                min="1"
                placeholder="Example : 15"
                value={form.employees}
                className={errors.employees ? "input-error" : ""}
                onChange={handleEmployeesChange}
              />

              {errors.employees && (
                <p className="field-error">{errors.employees}</p>
              )}
            </div>

            <div className="form-buttons">
              <button type="submit" className="primary-btn">
                {editingBranchId !== null ? "Update Branch" : "Add Branch"}
              </button>

              <button
                className="secondary-btn"
                type="button"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="stats">
        <StatCard icon="🏢" title="Total Branches" value={branches.length} />
        <StatCard icon="👥" title="Total Employees" value={totalEmployees} />
        <StatCard
          icon="💰"
          title="Today's Expenses"
          value={`${totalToday.toLocaleString()} EGP`}
        />
      </div>

      <div className="section-title">
        <h2>Branch Overview</h2>
        <span>Today</span>
      </div>

      <div className="branches-grid">
        {branches.length === 0 ? (
          <div className="card">
            <p>No branches found.</p>
          </div>
        ) : (
          branches.map((branch) => (
            <BranchCard
              key={branch.id}
              branch={branch}
              todayExpenses={getBranchExpenses(branch.id)}
              onEdit={handleEdit}
              onDelete={onDeleteBranch}
            />
          ))
        )}
      </div>
    </div>
  );
}
