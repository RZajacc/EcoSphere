"use client";
import React, {
  createContext,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { User } from "../../types/UserTypes";
import { cookies } from "next/headers";

// Context type
type AuthContextType = {
  user: User | undefined;
  setUser: React.Dispatch<SetStateAction<User | undefined>>;
  revalidateUser: () => Promise<void>;
  logout: () => Promise<void>;
  showDropdown: boolean;
  setShowDropdown: React.Dispatch<SetStateAction<boolean>>;
  toggleDropdown: () => void;
};
// Init value for the context
const AuthContextInit: AuthContextType = {
  user: undefined,
  setUser: async () => undefined,
  revalidateUser: async () => undefined,
  logout: async () => undefined,
  showDropdown: false,
  setShowDropdown: () => undefined,
  toggleDropdown: () => undefined,
};

export const AuthContext = createContext<AuthContextType>(AuthContextInit);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // State variables
  const [user, setUser] = useState<User | undefined>(undefined);
  const [showDropdown, setShowDropdown] = useState(false);

  //? ------------TOGGLE NAVBAR DROPDOWN---------------
  const toggleDropdown = () => {
    setShowDropdown((prevVal) => !prevVal);
  };

  //? ------------CHECK IF USER IS AUTHENTICATED---------------
  const checkAuth = async () => {
    const response = await fetch("/api/token", {
      method: "GET",
      credentials: "include",
    });
    // Get the value of the token if it exists
    const token: { authorized: boolean; token: string | undefined } =
      await response.json();

    //   Get user data
    if (token.authorized) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token.token}`);

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
    } else {
      setUser(undefined);
    }
  };

  //? ------------REVALIDATE USER METHOD---------------
  const revalidateUser = async () => {
    await checkAuth();
    setShowDropdown(false);
  };

  //? -----------LOGOUT METHOD---------------
  const logout = async () => {
    const response = await fetch("/api/token", {
      method: "POST",
      credentials: "include",
    });

    revalidateUser();
    setShowDropdown(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        revalidateUser,
        logout,
        showDropdown,
        setShowDropdown,
        toggleDropdown,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
