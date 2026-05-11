import { createContext, useEffect, useState } from "react";
import api from "../lib/axios";
import * as SecureStore from "expo-secure-store";
import handleErrorResponse from "../lib/webErrorMessages";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
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

  async function register(
    name,
    email,
    password,
    password_confirmation,
    height,
    weight,
  ) {
    try {
      const response = await api.post("/register", {
        name,
        email,
        password,
        password_confirmation,
        height,
        weight,
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

  async function updateBodyStats(height, weight) {
    try {
      const response = await api.put("/updateBodyStats", {
        height,
        weight,
        date: new Date().toLocaleDateString(),
      });
      getInitialUserValue();
    } catch (error) {
      const message = handleErrorResponse(error);
      throw new Error(message);
    }
  }

  // Query user information (validates the token as well)
  async function getInitialUserValue() {
    try {
      const response = await api.get("/getUserData");
      setUser(response.data.user);
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
      value={{ user, login, register, logout, updateBodyStats, authChecked }}
    >
      {children}
    </UserContext.Provider>
  );
}
