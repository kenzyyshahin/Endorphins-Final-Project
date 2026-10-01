import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const pageTitles = {
  "/expenses": "Expenses",
  "/monthly-expenses": "Monthly Expenses",
  "/add-expense": "Add Expense",
  "/branches": "Branches",
  "/reports": "Reports",
};

const pagePaths = {
  Expenses: "/expenses",
  "Monthly Expenses": "/monthly-expenses",
  "Add Expense": "/add-expense",
  Branches: "/branches",
  Reports: "/reports",
};

export default function Layout({ title, children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const currentTitle = title || pageTitles[location.pathname] || "Expenses";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="app-shell">
      <Sidebar
        activePage={currentTitle}
        setActivePage={(page) => navigate(pagePaths[page])}
        user={user}
        onLogout={handleLogout}
      />
      <div className="main-column">
        <Topbar
          title={currentTitle}
          user={user}
          onAddExpense={() => navigate("/add-expense")}
        />
        <main className="page-container">{children}</main>
      </div>
    </div>
  );
}
