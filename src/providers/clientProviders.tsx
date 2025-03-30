"use client";

import { ReactNode } from "react";
import { AppProvider } from "../context/AppContext";
import { AuthProvider } from "../context/AuthContext";
import dynamic from "next/dynamic";

// Dynamically import the ErrorBoundary component
const ErrorBoundary = dynamic(
  () => import("@components/common/ErrorBoundary"),
  {
    ssr: false,
  },
);

const ClientProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AppProvider>
      <AuthProvider>
        <ErrorBoundary>{children}</ErrorBoundary>
      </AuthProvider>
    </AppProvider>
  );
};

export default ClientProvider;
