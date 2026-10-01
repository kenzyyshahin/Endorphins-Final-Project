import { useEffect, useState } from "react";
import ExpenseForm from "../components/ExpenseForm";

import { useAuth } from "../context/AuthContext";

export default function AddExpense({
  branches,
  editingExpense,
  onSaveExpense,
  onCancel,
}) {
  const { user } = useAuth();

  const isEditing = Boolean(editingExpense);

  const [formData, setFormData] = useState({
    date: "",
    item: "",
    category: "",
    branchId: "",
    quantity: "",
    price: "",
    notes: "",
  });

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        date: editingExpense.date || "",
        item: editingExpense.item || "",
        category: editingExpense.category || "",
        branchId: editingExpense.branchId || "",
        quantity: editingExpense.quantity || "",
        price: editingExpense.price || "",
        notes: editingExpense.notes || "",
      });
    } else {
      setFormData({
        date: "",
        item: "",
        category: "",
        branchId: "",
        quantity: "",
        price: "",
        notes: "",
      });
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveExpense({
      ...formData,
      branchId: Number(
        user?.role === "office_admin" ? user.officeId : formData.branchId,
      ),
      quantity: Number(formData.quantity),
      price: Number(formData.price),
    });
  };
  return (
    <>
      <h1>{isEditing ? "Edit Expense" : "Add Expense"}</h1>
      <ExpenseForm
        form={formData}
        setForm={setFormData}
        branches={branches}
        onSubmit={handleSubmit}
        onCancel={onCancel}
        submitText={isEditing ? "Update Expense" : "Add Expense"}
        user={user}
      />
    </>
  );
}
