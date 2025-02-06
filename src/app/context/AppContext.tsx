import { createContext, useContext, useState, ReactNode } from "react";

export type IStreamingType = "series" | "movies" | "animes";
interface AppContextProps {
  streamingTypeContext: IStreamingType;
  setStreamingTypeContext: (streamingType: IStreamingType) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [streamingTypeContext, setStreamingTypeContext] =
    useState<IStreamingType>("series");

  return (
    <AppContext.Provider
      value={{ streamingTypeContext, setStreamingTypeContext }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
