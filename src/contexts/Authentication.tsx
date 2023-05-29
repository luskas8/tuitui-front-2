import { createContext, useEffect, useState } from "react";
import { BaseChildrenProps } from "../@types/global";
import { APIUser } from "../@types/user";
import Squeleton from "../components/Squeleton";
import { useAlert } from "../hooks";
import { LoadingLayout } from "../layouts/global";
import { loginUser, retrieveUserByID } from "../services/user";
import { clearUserAuthTokenV1, clearUserID, retriveUserID, saveUserAuthTokenV1, saveUserID } from "../utilities/localStorage";

interface AuthenticationContextProps {
  authenticated: boolean;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => void;
  registerLogin: (response: APIUser) => void;
}

export const AuthenticationContext = createContext<AuthenticationContextProps>({} as AuthenticationContextProps);

export function AuthenticationProvider({ children }: BaseChildrenProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState<boolean>(!!retriveUserID());

  const { updateAlert } = useAlert();

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
    clearUserAuthTokenV1();
    clearUserID();
    setAuthenticated(false);
  }

  async function authCheck() {
    // setIsLoading(_ => true);

    const userId = retriveUserID() as string;

    if (!userId) {
      setAuthenticated(false);
      setIsLoading(_ => false);
      return;
    }

    const response = await retrieveUserByID(userId);

    if ('status' in response) {
      setIsLoading(_ => false);
      setAuthenticated(false);
      clearUserAuthTokenV1();
      clearUserID();
      updateAlert({
        message: response.message,
        type: "error"
      })
      return;
    }

    // setIsLoading(_ => false);
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
    authCheck().then(_ => setIsLoading(_ => false))
  }, []);

  if (isLoading) {
    return <LoadingLayout classname="flex flex-col items-center gap-3 justify-center">
      <Squeleton />
    </LoadingLayout>;
  }

  return (
    <AuthenticationContext.Provider value={{ authenticated, handleLogin, handleLogout, registerLogin }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
