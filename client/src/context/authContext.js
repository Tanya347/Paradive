import React, { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [cookies, removeCookie] = useCookies([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      if (cookies.token) {
        try {
          const { data } = await axios.post(
            "http://localhost:4000/verify", // Update with your verification endpoint
            {},
            { withCredentials: true }
          );
          if (data.status) {
            setUser(data.user);
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error("Verification error:", error);
          setUser(null);
        }
      }
    };
    verifyUser();
  }, [cookies]);

  const logout = async () => {
    try {
        // Send a request to the backend to remove the cookie
        await axios.post(
          "http://localhost:4000/auth/logout", // Your logout endpoint
          {},
          { withCredentials: true }
        );
        // Optionally remove the token cookie from frontend (even though the backend clears it)
        removeCookie("jwt");
  
        // Set user to null to indicate logout
        setUser(null);
      } catch (error) {
        console.error("Logout error:", error);
      }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
