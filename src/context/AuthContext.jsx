import { useContext, createContext, useState } from "react";
import { users } from "../data/user";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("mockUser");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email, password) => {
    const foundUser = users.find(
      (candidate) =>
        candidate.email.toLowerCase() === email.toLowerCase() &&
        candidate.password === password,
    );

    if (!foundUser) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    const safeUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
      officeId: foundUser.officeId,
    };

    setUser(safeUser);

    localStorage.setItem("mockUser", JSON.stringify(safeUser));

    return {
      success: true,
      user: safeUser,
    };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("mockUser");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
