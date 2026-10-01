import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import LoginForm from "../components/LoginForm";

export default function Login() {
  const navigate = useNavigate();

  const { login, isAuthenticated } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const result = login(email, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    if (result.user.role === "super_admin") {
      navigate("/");
    } else {
      navigate("/add-expense");
    }
  };

  return (
    <div className="login-page">
      <LoginForm
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        error={error}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
