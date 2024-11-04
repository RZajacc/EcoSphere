"use client";
import { createContext, useEffect } from "react";

export const AuthContext = createContext(1);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Method checking if cookie is attached to the request
  const checkAuth = async () => {
    const response = await fetch("/api", {
      method: "GET",
      credentials: "include",
    });
    // Get the value of the token if it exists
    const token: string | undefined = await response.json();

    console.log("TOKEN", token);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  //   const response = await fetch("/api", { method: " GET" });
  //   console.log(response);

  return <AuthContext.Provider value={3}>{children}</AuthContext.Provider>;
};
