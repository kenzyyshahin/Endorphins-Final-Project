/* Backend API helpers are temporarily disabled while the app uses mockData.js.
const API_URL = "http://localhost:5000/api";

export const getBranches = async () => {
  const response = await fetch(`${API_URL}/branches`);
  if (!response.ok) {
    throw new Error("Failed to fetch branches");
  }
  return response.json();
};

export const getExpenses = async () => {
  const response = await fetch(`${API_URL}/expenses`);
  if (!response.ok) {
    throw new Error("Failed to fetch expenses");
  }
  return response.json();
};

export const getCategories = async () => {
  const response = await fetch(`${API_URL}/categories`);

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
};

export const updateExpense = async (id, expenseData) => {
  const response = await fetch(`${API_URL}/expenses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expenseData),
  });

  if (!response.ok) {
    throw new Error("Failed to update expense");
  }

  return response.json();
};
*/
