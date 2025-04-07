import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import httpStatus from "http-status";

export const AuthContext = createContext();

const client = axios.create({
  baseURL: "http://localhost:5000/api/v1/users",
});

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize auth state on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const response = await client.get("/me");
          setUserData(response.data.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleRegister = async (name, email, password) => {
    try {
      setIsLoading(true);
      const response = await client.post("/register", {
        name,
        email,
        password,
      });

      if (response.status === httpStatus.CREATED) {
        await handleLogin(email, password); // Auto-login after registration
        return response.data.message;
      }
    } catch (err) {
      throw err.response?.data?.message || "Registration failed";
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      setIsLoading(true);
      const response = await client.post("/auth", {
        email,
        password,
      });

      if (response.status === httpStatus.OK) {
        localStorage.setItem("token", response.data.token);
        client.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
        
        // Fetch user data
        const userResponse = await client.get("/me");
        setUserData(userResponse.data.user);
        setIsAuthenticated(true);
        
        navigate("/dashboard"); // Redirect after login
      }
    } catch (err) {
      throw err.response?.data?.message || "Login failed";
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete client.defaults.headers.common["Authorization"];
    setUserData(null);
    setIsAuthenticated(false);
    navigate("/auth");
  };

  const value = {
    userData,
    isAuthenticated,
    isLoading,
    handleRegister,
    handleLogin,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};