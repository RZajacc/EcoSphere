"use client";
import { createContext, SetStateAction, useEffect, useState } from "react";
import { User } from "../../types/UserTypes";
import { cookies } from "next/headers";

// Context type
type AuthContextType = {
  user: User | undefined;
  setUser: React.Dispatch<SetStateAction<User | undefined>>;
  checkAuth: () => Promise<void>;
  logout: () => void;
};
// Init value for the context
const AuthContextInit: AuthContextType = {
  user: undefined,
  setUser: async () => undefined,
  checkAuth: async () => undefined,
  logout: async () => undefined,
};

export const AuthContext = createContext<AuthContextType>(AuthContextInit);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  // Method checking if cookie is attached to the request
  const checkAuth = async () => {
    const response = await fetch("/api/getToken", {
      method: "GET",
      credentials: "include",
    });
    // Get the value of the token if it exists
    const token: string | undefined = await response.json();

    //   Get user data
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const response = await fetch("http://localhost:5000/users/getUser", {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      });

      if (response.ok) {
        const userData: User = await response.json();
        setUser(userData);
      } else {
        setUser(undefined);
      }
    }
  };

  const logout = async () => {
    const response = await fetch("/api/clearToken", {
      method: "GET",
      credentials: "include",
    });
    checkAuth();
    // const response = await fetch("http://localhost:5000/users/logout", {
    //   method: "GET",
    //   redirect: "follow",
    // });
    // if (response.ok) {
    //   checkAuth();
    // }
    // const cookieStore = cookies();
    // cookieStore.delete("auth-token");
    // checkAuth();
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, checkAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
