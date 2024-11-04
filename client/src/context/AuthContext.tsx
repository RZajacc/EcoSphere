"use client";
import { createContext } from "react";

export const AuthContext = createContext(1);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <AuthContext.Provider value={3}>{children}</AuthContext.Provider>;
};
