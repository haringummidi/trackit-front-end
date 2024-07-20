import React, { createContext, useReducer } from "react";

// Define the initial state and reducer
const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  roles: [],
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        roles: action.payload.roles,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        accessToken: null,
        refreshToken: null,
        roles: [],
      };
    case "REFRESH_TOKEN":
      return {
        ...state,
        accessToken: action.payload,
      };
    default:
      return state;
  }
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData) => {
    console.log(userData);
    dispatch({ type: "LOGIN", payload: userData });
  };

  const logout = () => {
    window.localStorage.removeItem("userInfo");
    dispatch({ type: "LOGOUT" });
  };

  const refreshToken = (newAccessToken) => {
    dispatch({ type: "REFRESH_TOKEN", payload: newAccessToken });
  };

  const isAuthenticated = () => {
    return !!state.accessToken;
  };

  const hasRole = (roles) => {
    if (!Array.isArray(roles) || !Array.isArray(state.roles)) {
      return false;
    }

    return roles.every((role) => state.roles.includes(role));
  };

  const token = () => {
    return state.accessToken;
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        login,
        logout,
        refreshToken,
        isAuthenticated,
        hasRole,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
