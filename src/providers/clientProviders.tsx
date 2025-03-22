"use client";

import { ReactNode } from "react";
import { AppProvider } from "../context/AppContext";
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
      <ErrorBoundary>{children}</ErrorBoundary>
    </AppProvider>
  );
};

export default ClientProvider;
