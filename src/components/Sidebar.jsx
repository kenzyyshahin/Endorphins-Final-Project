export default function Sidebar({ activePage, setActivePage, user, onLogout }) {
  const menuItems = [
    {
      name: "Expenses",
      icon: "EX",
    },
    {
      name: "Monthly Expenses",
      icon: "MO",
    },
    {
      name: "Add Expense",
      icon: "+",
    },
    {
      name: "Branches",
      icon: "BR",
    },
    {
      name: "Reports",
      icon: "RP",
    },
  ];
  const visibleItems =
    user?.role === "office_admin"
      ? menuItems.filter(
          (item) => item.name === "Add Expense" || item.name === "Expenses",
        )
      : menuItems;

  return (
    <aside className="sidebar">
      <div className="logo">
        <span className="brand-mark">O</span>
        <div>
          <h2>OfficeHub</h2>
          <span>FINANCE WORKSPACE</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <p className="nav-heading">WORKSPACE</p>
        {visibleItems.map((item) => (
          <button
            key={item.name}
            type="button"
            className={
              activePage === item.name ? "nav-item active" : "nav-item"
            }
            onClick={() => setActivePage(item.name)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.name}</span>
            {activePage === item.name && <span className="nav-indicator" />}
          </button>
        ))}
      </nav>

      <div className="user-card">
        <div className="sidebar-user-avatar">
          {(user?.name || "Admin").slice(0, 1).toUpperCase()}
        </div>

        <div className="sidebar-user-info">
          <strong>{user?.name || "Admin"}</strong>
          <span>
            {user?.role === "office_admin" ? "Office admin" : "Super admin"}
          </span>
        </div>
        <button
          className="logout-button"
          type="button"
          onClick={onLogout}
          aria-label="Sign out"
          title="Sign out"
        >
          ↗
        </button>
      </div>
    </aside>
  );
}
