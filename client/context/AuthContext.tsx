"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface UserType {
  name?: string;
  email?: string;
  token?: string;
}

interface AuthContextType {
  user: UserType | null;
  setUser: React.Dispatch<
    React.SetStateAction<UserType | null>
  >;
}

const AuthContext =
  createContext<AuthContextType | null>(
    null
  );

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] =
    useState<UserType | null>(null);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("userInfo");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};