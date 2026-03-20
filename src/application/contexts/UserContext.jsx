import { createContext, useEffect, useState } from "react";
import api from "../lib/axios";
import * as SecureStore from "expo-secure-store";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState();
  const [authChecked, setAuthChecked] = useState(false);

  async function login(email, password) {
    try {
      const response = await api.post("/login", {
        email,
        password,
      });
      await SecureStore.setItemAsync("liftingPalToken", response.data.token);
      setUser(response.data.user);
    } catch (error) {
      const message = handleErrorResponse(error);
      throw new Error(message);
    }
  }

  async function register(name, email, password, password_confirmation) {
    try {
      const response = await api.post("/register", {
        name,
        email,
        password,
        password_confirmation,
      });
      await SecureStore.setItemAsync("liftingPalToken", response.data.token);
      setUser(response.data.user);
    } catch (error) {
      const message = handleErrorResponse(error);
      throw new Error(message);
    }
  }

  async function logout() {
    try {
      const response = await api.post("/logout");
      await SecureStore.deleteItemAsync("liftingPalToken");
      setUser(null);
    } catch (error) {
      const message = handleErrorResponse(error);
      throw new Error(message);
    }
  }

  // Query user information (validates the token as well)
  async function getInitialUserValue() {
    try {
      const response = await api.get("/getUserData");
      setUser(response);
    } catch (error) {
      setUser(null);
      const token = await SecureStore.getItemAsync("liftingPalToken");
      if (token) {
        await SecureStore.deleteItemAsync("liftingPalToken");
      }
    } finally {
      setAuthChecked(true);
    }
  }

  useEffect(() => {
    getInitialUserValue();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, login, register, logout, authChecked }}
    >
      {children}
    </UserContext.Provider>
  );
}

function handleErrorResponse(error) {
  if (!error.response) {
    return "Connectivity issue detected, please try again later";
  }
  // Retreive custom errors
  if (error.response.data.error) {
    return error.response.data.error;
    // Retreive laravel's validation errors
  } else if (error.response.data.errors) {
    return Object.values(error.response.data.errors)[0][0];
  }
  return "Something went wrong, please try again later";
}
