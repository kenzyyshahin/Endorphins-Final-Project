import { useEffect, useMemo, useState } from "react";
import {
  BrowserRouter,
  HashRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import AuthProvider, { useAuth } from "./context/AuthContext";
import RoleRoute from "./components/RoleRoute";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Expenses from "./pages/Expenses";
import MonthlyExpenses from "./pages/MonthlyExpenses";
import AddExpense from "./pages/AddExpense";
import Branches from "./pages/Branches";
import Reports from "./pages/Reports";
import Unauthorized from "./pages/Unauthorized";

import { mockBranches, mockExpenses, mockCategories } from "./data/mockData";

const EXPENSES_STORAGE_KEY = "officehub.expenses";

function getStoredExpenses() {
  try {
    const storedExpenses = localStorage.getItem(EXPENSES_STORAGE_KEY);
    const parsedExpenses = storedExpenses ? JSON.parse(storedExpenses) : null;
    return Array.isArray(parsedExpenses) ? parsedExpenses : mockExpenses;
  } catch {
    return mockExpenses;
  }
}

function HomeRedirect() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Navigate
      to={user.role === "office_admin" ? "/add-expense" : "/expenses"}
      replace
    />
  );
}

function AppRoutes() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [editingExpense, setEditingExpense] = useState(null);
  const [branches, setBranches] = useState(mockBranches);
  const [expenses, setExpenses] = useState(getStoredExpenses);
  const [categories] = useState(mockCategories);
  const [filters, setFilters] = useState({
    branch: "All",
    category: "All",
    search: "",
  });

  useEffect(() => {
    localStorage.setItem(EXPENSES_STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    const syncExpenses = (event) => {
      if (event.key !== EXPENSES_STORAGE_KEY || !event.newValue) {
        return;
      }

      try {
        const storedExpenses = JSON.parse(event.newValue);
        if (Array.isArray(storedExpenses)) {
          setExpenses(storedExpenses);
        }
      } catch {
        // Ignore malformed values from another tab.
      }
    };

    window.addEventListener("storage", syncExpenses);
    return () => window.removeEventListener("storage", syncExpenses);
  }, []);

  const totalExpenses = useMemo(
    () =>
      expenses.reduce(
        (total, expense) =>
          total + Number(expense.price) * Number(expense.quantity),
        0,
      ),
    [expenses],
  );

  const visibleBranches = useMemo(
    () =>
      user?.role === "office_admin"
        ? branches.filter(
            (branch) => Number(branch.id) === Number(user.officeId),
          )
        : branches,
    [branches, user],
  );

  const visibleExpenses = useMemo(
    () =>
      user?.role === "office_admin"
        ? expenses.filter(
            (expense) => Number(expense.branchId) === Number(user.officeId),
          )
        : expenses,
    [expenses, user],
  );

  const expenseFilters =
    user?.role === "office_admin"
      ? { ...filters, branch: String(user.officeId) }
      : filters;

  const deleteExpense = (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) {
      return;
    }
    setExpenses((previousExpenses) =>
      previousExpenses.filter((expense) => expense.id !== id),
    );
  };

  const editExpense = (expense) => {
    setEditingExpense(expense);
    navigate("/add-expense");
  };

  const saveExpense = (expenseData) => {
    if (editingExpense) {
      setExpenses((previousExpenses) =>
        previousExpenses.map((expense) =>
          expense.id === editingExpense.id
            ? { ...expenseData, id: editingExpense.id }
            : expense,
        ),
      );
    } else {
      setExpenses((previousExpenses) => [
        ...previousExpenses,
        { ...expenseData, id: Date.now() },
      ]);
    }
    setEditingExpense(null);
    navigate("/expenses");
  };

  const addBranch = (branch) => {
    setBranches((previousBranches) => [
      ...previousBranches,
      { ...branch, id: Date.now(), employees: Number(branch.employees) },
    ]);
  };

  const editBranch = (branch) => {
    setBranches((previousBranches) =>
      previousBranches.map((currentBranch) =>
        currentBranch.id === branch.id ? branch : currentBranch,
      ),
    );
  };

  const deleteBranch = (id) => {
    if (!window.confirm("Are you sure you want to delete this branch?")) {
      return;
    }
    setBranches((previousBranches) =>
      previousBranches.filter((branch) => branch.id !== id),
    );
  };

  const withLayout = (title, allowedRoles, content) => (
    <RoleRoute allowedRoles={allowedRoles}>
      <Layout title={title}>{content}</Layout>
    </RoleRoute>
  );

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route
        path="/expenses"
        element={withLayout(
          "Expenses",
          ["super_admin", "office_admin"],
          <Expenses
            expenses={visibleExpenses}
            branches={visibleBranches}
            categories={categories}
            filters={expenseFilters}
            setFilters={setFilters}
            branchLocked={user?.role === "office_admin"}
            onDelete={deleteExpense}
            onEdit={editExpense}
          />,
        )}
      />
      <Route
        path="/monthly-expenses"
        element={withLayout(
          "Monthly Expenses",
          ["super_admin"],
          <MonthlyExpenses
            expenses={expenses}
            branches={branches}
            categories={categories}
          />,
        )}
      />
      <Route
        path="/add-expense"
        element={withLayout(
          "Add Expense",
          ["super_admin", "office_admin"],
          <AddExpense
            branches={branches}
            editingExpense={editingExpense}
            onSaveExpense={saveExpense}
            onCancel={() => {
              setEditingExpense(null);
              navigate("/expenses");
            }}
          />,
        )}
      />
      <Route
        path="/branches"
        element={withLayout(
          "Branches",
          ["super_admin"],
          <Branches
            branches={branches}
            expenses={expenses}
            onAddBranch={addBranch}
            onEditBranch={editBranch}
            onDeleteBranch={deleteBranch}
          />,
        )}
      />
      <Route
        path="/reports"
        element={withLayout(
          "Reports",
          ["super_admin"],
          <Reports
            expenses={expenses}
            branches={branches}
            totalExpenses={totalExpenses}
          />,
        )}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </HashRouter>
  );
}
