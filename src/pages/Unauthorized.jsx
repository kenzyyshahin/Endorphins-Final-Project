import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Unauthorized() {
  const { user } = useAuth();
  const returnPath = user?.role === "office_admin" ? "/add-expense" : "/";

  return (
    <div className="unauthorized-page">
      <div className="unauthorized-card">
        <div className="unauthorized-icon">🔒</div>
        <h1>Access Denied</h1>
        <p>You don't have permission to access this page</p>
        <Link to={returnPath} className="login-button">
          Go Back
        </Link>
      </div>
    </div>
  );
}
