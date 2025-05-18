"use client";

import { UserProfile } from "@/types/define.type";
import { createContext } from "react";
import { useProfile } from "./fetching-client";

export type AuthContexType = {
  user: UserProfile | null | undefined;
  isLoading: boolean;
  error: any;
};

export const AuthContext = createContext<AuthContexType>({
  isLoading: false,
  user: null,
  error: null,
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isLoading, error } = useProfile();

  return (
    <AuthContext value={{ isLoading, user: data, error }}>
      {children}
    </AuthContext>
  );
}
