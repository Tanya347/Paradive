import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

const AuthContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null
};

// Define action types
const actionTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  VERIFY_USER: "VERIFY_USER",
  SET_ERROR: "SET_ERROR",
  SET_LOADING: "SET_LOADING"
};

// Reducer function to handle state updates
const authReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return { ...state, user: action.payload, loading: false, error: null };
    case actionTypes.LOGOUT:
      return { ...state, user: null, loading: false, error: null };
    case actionTypes.VERIFY_USER:
      return { ...state, user: action.payload, loading: false };
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    case actionTypes.SET_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [cookies, removeCookie] = useCookies(["jwt"]);
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const verifyUser = async () => {
      if (cookies.jwt && !state.user) {
        dispatch({ type: actionTypes.SET_LOADING });
        try {
          const { data } = await axios.post(
            "http://localhost:4000/verify", // Update with your verification endpoint
            {},
            { withCredentials: true }
          );
          if (data.status) {
            dispatch({ type: actionTypes.VERIFY_USER, payload: data.user });
            localStorage.setItem("user", JSON.stringify(data.user));
          } else {
            dispatch({ type: actionTypes.LOGOUT });
            localStorage.removeItem("user");
          }
        } catch (error) {
          dispatch({ type: actionTypes.SET_ERROR, payload: "Verification error" });
          localStorage.removeItem("user");
        }
      }
    };
    verifyUser();
  }, [cookies.jwt, state.user]);

  const login = (userData) => {
    dispatch({ type: actionTypes.LOGIN, payload: userData });
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      removeCookie("jwt");
      dispatch({ type: actionTypes.LOGOUT });
      localStorage.removeItem("user");
    } catch (error) {
      dispatch({ type: actionTypes.SET_ERROR, payload: "Logout error" });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
