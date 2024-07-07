"use client";
import React, { createContext, useReducer, useContext, ReactNode } from "react";

// Define initial states
interface AuthenticationState {
  isAuthenticated: boolean;
}

interface AccessControllRoleState {
  role: "ROLE_ADMIN" | "ROLE_USER";
}

interface ThemeState {
  theme: "LIGHT" | "DARK";
}

interface ToastState {
  toast: {
    type: "LOADING" | "SUCCESS" | "ERROR";
    message: string;
    isVisible: boolean;
  };
}

const initialAuthenticationState: AuthenticationState = {
  isAuthenticated: false,
};

const initialThemeState: ThemeState = {
  theme: "LIGHT",
};
const initialAccessControlRole: AccessControllRoleState = {
  role: "ROLE_USER",
};

const toastInitialState: ToastState = {
  toast: {
    type: "LOADING",
    message: "",
    isVisible: false,
  },
};

// Define action types
type AuthenticationAction = { type: "LOGIN" } | { type: "LOGOUT" };
type AccessControllRoleAction = { type: "ADMIN" } | { type: "USER" };
type ThemeAction = { type: "DARK" } | { type: "LIGHT" };
type ToastAction =
  | {
      type: "SHOW_TOAST";
      payload: { type: "SUCCESS" | "ERROR" | "LOADING"; message: string };
    }
  | { type: "HIDE_TOAST" };

// Define reducer functions
const authenticationReducer = (
  state: AuthenticationState,
  action: AuthenticationAction
): AuthenticationState => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isAuthenticated: true };
    case "LOGOUT":
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};
const roleAccessControllReducer = (
  state: AccessControllRoleState,
  action: AccessControllRoleAction
): AccessControllRoleState => {
  switch (action.type) {
    case "ADMIN":
      return { ...state, role: "ROLE_ADMIN" };
    case "USER":
      return { ...state, role: "ROLE_USER" };
    default:
      return state;
  }
};

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case "DARK":
      return { ...state, theme: "DARK" };
    case "LIGHT":
      return { ...state, theme: "LIGHT" };
    default:
      return state;
  }
};

const ToastReducer = (state: ToastState, action: ToastAction) => {
  switch (action.type) {
    case "SHOW_TOAST":
      return {
        ...state,
        toast: {
          ...state.toast,
          type: action.payload.type,
          message: action.payload.message,
          isVisible: true,
        },
      };
    case "HIDE_TOAST":
      return {
        ...state,
        toast: {
          ...state.toast,
          isVisible: false,
        },
      };
    default:
      return state;
  }
};

// Combine reducers
const rootReducer = combineReducers({
  authentication: authenticationReducer,
  theme: themeReducer,
  toast: ToastReducer,
  role: roleAccessControllReducer,
});

// Create context
interface ContextType {
  state: {
    authentication: AuthenticationState;
    theme: ThemeState;
    toast: ToastState;
    role: AccessControllRoleState;
  };
  dispatch: React.Dispatch<any>;
}

const GlobalState = createContext<ContextType | undefined>(undefined);

// Create context provider component
interface GlobalStateProviderProps {
  children: ReactNode;
}

export const GlobalStateProvider = ({ children }: GlobalStateProviderProps) => {
  const [state, dispatch] = useReducer(rootReducer, {
    authentication: initialAuthenticationState,
    theme: initialThemeState,
    toast: toastInitialState,
    role: initialAccessControlRole,
  });

  return (
    <GlobalState.Provider value={{ state, dispatch }}>
      {children}
    </GlobalState.Provider>
  );
};

// Custom hook to consume the context
export const useGlobalState = (): ContextType => {
  const context = useContext(GlobalState);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};

// Helper function to combine reducers
function combineReducers(reducers: any) {
  return (state: any, action: any) => {
    return Object.keys(reducers).reduce(
      (acc, key) => ({
        ...acc,
        [key]: reducers[key](acc[key], action),
      }),
      state
    );
  };
}
