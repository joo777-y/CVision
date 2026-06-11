import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

export function AppProvider({ children }) {

  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "HR Manager",
    role: "HR"
  });
  

  const [accessToken, setToken] = useState(localStorage.getItem("accessToken"));

  const logout = () => {
      localStorage.removeItem("accessToken");

      setToken(null);

      navigate("/login-page");
  };

  return (
    <AppContext.Provider value={{ user, accessToken, setToken, logout }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);