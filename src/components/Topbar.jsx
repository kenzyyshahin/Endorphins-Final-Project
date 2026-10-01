export default function Topbar({ title, onAddExpense, user }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <p className="topbar-overline">OFFICEHUB / FINANCE</p>
        <h1>{title}</h1>
      </div>

      <div className="topbar-right">
        <button className="topbar-add-btn" onClick={onAddExpense}>
          <span aria-hidden="true">+</span> Add expense
        </button>

        <div className="topbar-user">
          <div className="user-avatar">
            {(user?.name || "A").slice(0, 1).toUpperCase()}
          </div>
          <div className="user-info">
            <strong>{user?.name || "Admin"}</strong>
            <span>{user?.role === "office_admin" ? "Office admin" : "Super admin"}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
