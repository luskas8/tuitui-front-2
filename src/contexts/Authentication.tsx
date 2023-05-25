import { createContext, useEffect, useState } from "react";
import { BaseChildrenProps } from "../@types/global";
import { api } from "../services/api";
import { retriveUserAuthToken, retriveUserID, saveUserAuthTokenV1, saveUserID } from "../utilities/localStorage";

interface AuthenticationContextProps {
  authenticated: boolean;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => void;
}

export const AuthenticationContext = createContext<AuthenticationContextProps>({} as AuthenticationContextProps);

export function AuthenticationProvider({ children }: BaseChildrenProps) {
  const [authenticated, setAuthenticated] = useState(false);

  async function handleLogin(email: string, password: string) {
    const payload = {
      userEmail: email,
      password
    };

    const response = await api.post('/users/signin', payload);

    if (response.status !== 200) {
      return;
    }

    const { token, user: { _id } } = response.data;

    saveUserAuthTokenV1(token);
    saveUserID(_id);

    setAuthenticated(true);
  }

  function handleLogout() {
    setAuthenticated(false);
  }

  useEffect(() => {
    if (retriveUserAuthToken() && retriveUserID()) {
      setAuthenticated(true);
    }
  }, []);

  return (
    <AuthenticationContext.Provider value={{ authenticated, handleLogin, handleLogout }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
