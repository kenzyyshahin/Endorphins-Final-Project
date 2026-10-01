export default function LoginForm({
  email,
  password,
  setEmail,
  setPassword,
  error,
  onSubmit,
}) {
  return (
    <div className="login-card">
      <div className="login-logo">📊</div>

      <h1>Welcome Back</h1>
      <p className="login-subtitle">Sign in to ExpenseTracker</p>

      {error && <div className="login-error">{error}</div>}

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" className="login-button">
          Sign In
        </button>
      </form>

      <div className="demo-accounts">
        <h3>Demo Accounts</h3>

        <div className="demo-account">
          <strong>Super Admin</strong>
          <span>admin@expense.com</span>
        </div>

        <div className="demo-account">
          <strong>Office Admin</strong>
          <span>office1@expense.com</span>
        </div>

        <small>
          Super Admin password :<strong>admin123</strong> <br />
          Office Admin password : <strong>office123</strong>
        </small>
      </div>
    </div>
  );
}
