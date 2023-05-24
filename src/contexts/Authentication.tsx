import { createContext, useState } from "react";
import { BaseChildrenProps } from "../@types/global";

interface AuthenticationContextProps {
  authenticated: boolean;
  handleLogin: (email: string, password: string) => void;
  handleLogout: () => void;
}

export const AuthenticationContext = createContext<AuthenticationContextProps>({} as AuthenticationContextProps);

export function AuthenticationProvider({ children }: BaseChildrenProps) {
  const [authenticated, setAuthenticated] = useState(false);

  function handleLogin(email: string, password: string) {
    const payload = {
      email,
      password
    };
    setAuthenticated(true);
  }

  function handleLogout() {
    setAuthenticated(false);
  }

  return (
    <AuthenticationContext.Provider value={{ authenticated, handleLogin, handleLogout }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
