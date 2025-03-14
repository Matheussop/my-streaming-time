import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
} from "react";

export type StreamingType = "series" | "movies" | "animes";

// Define the state interface
interface AppState {
  streamingType: StreamingType;
}

// Define action types
type AppAction = { type: "SET_STREAMING_TYPE"; payload: StreamingType };

const initialState: AppState = {
  streamingType: "series",
};

// Reducer function
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "SET_STREAMING_TYPE":
      return {
        ...state,
        streamingType: action.payload,
      };
    default:
      return state;
  }
};

// Create context with state and dispatch
interface AppContextType {
  state: AppState;
  dispatch: Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
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

// Helper hooks for specific state values
export const useStreamingType = () => {
  const { state } = useAppContext();
  return state.streamingType;
};

// Helper hooks for specific actions
export const useSetStreamingType = () => {
  const { dispatch } = useAppContext();
  return (streamingType: StreamingType) => {
    dispatch({ type: "SET_STREAMING_TYPE", payload: streamingType });
  };
};
