import { createContext, useEffect, useState } from "react";
import { BaseChildrenProps } from "../@types/global";
import { useAlert } from "../hooks";
import { loginUser, retrieveUserByID } from "../services/user";
import { clearUserAuthTokenV1, clearUserID, retriveUserID, saveUserAuthTokenV1, saveUserID } from "../utilities/localStorage";
import { APIUser } from "../@types/user";

interface AuthenticationContextProps {
  authenticated: boolean;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => void;
  registerLogin: (response: APIUser) => void;
}

export const AuthenticationContext = createContext<AuthenticationContextProps>({} as AuthenticationContextProps);

export function AuthenticationProvider({ children }: BaseChildrenProps) {
  const { updateAlert } = useAlert();
  const [authenticated, setAuthenticated] = useState(false);

  async function handleLogin(email: string, password: string) {
    const response = await loginUser({ userEmail: email, password });

    if ('status' in response) {
      updateAlert({
        message: response.message,
        type: "error"
      })
      return;
    }

    const { token, user: { _id } } = response;

    saveUserAuthTokenV1(token);
    saveUserID(_id);

    setAuthenticated(true);
  }

  function handleLogout() {
    setAuthenticated(false);
  }

  async function authCheck() {
    const userId = retriveUserID() as string;
    const response = await retrieveUserByID(userId);

    if ('status' in response) {
      setAuthenticated(false);
      clearUserAuthTokenV1();
      clearUserID();
      updateAlert({
        message: response.message,
        type: "error"
      })

      return;
    }

    setAuthenticated(true);
    return;
  }

  function registerLogin(response: APIUser) {
    const { token, user: { _id } } = response;

    saveUserAuthTokenV1(token);
    saveUserID(_id);

    setAuthenticated(true);
  }

  useEffect(() => {
    authCheck()
  }, []);

  return (
    <AuthenticationContext.Provider value={{ authenticated, handleLogin, handleLogout, registerLogin }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
