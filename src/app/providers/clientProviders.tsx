"use client";

import { ReactNode } from "react";
import { AppProvider } from "../context/AppContext";

const ClientProvider = ({ children }: { children: ReactNode }) => {
  return <AppProvider>{children}</AppProvider>;
};

export default ClientProvider;
