import { createContext, useState, useEffect } from "react";

export interface Alert {
  message: string;
  type: "success" | "error" | "warning" | "info" | "default";
}

export interface AlertContextType {
  alert: Alert;
  updateAlert: (alert: Alert) => void;
  hideAlert: () => void;
}

export const AlertContext = createContext<AlertContextType>({} as AlertContextType);

export function AlertProvider({ children }: any) {
  const [alertVisibility, setAlertVisibility] = useState(false);
  const [alert, setAlert] = useState<Alert>({} as Alert);

  function updateAlert(alert: Alert) {
    setAlert(_ => alert);
    setAlertVisibility(_ => true);
  }

  function hideAlert() {
    setAlertVisibility(_ => false);
  }

  useEffect(() => {
    if (!alertVisibility) return;

    const timeout = setTimeout(() => {
      hideAlert();
    }, 11000);

    return () => clearTimeout(timeout);
  }, [alertVisibility])

  return (
    <AlertContext.Provider value={{ alert, updateAlert, hideAlert }}>
      <div className={`alert absolute z-50 top-7 right-2 ${alertVisibility ? "block" : "hidden"}`}>
        <div onClick={hideAlert} className={`alert-content cursor-pointer min-w-[240px] px-2 py-4 bg-white rounded drop-shadow-sm flex items-center ${alert.type || "error"}`}>
          <h1 className={`alert-message text-sm font-normal text-slate-500 ${alert.type || "default"}`}>{alert.message || "testeeeeeeeeeeee"}</h1>
        </div>
      </div>
      {children}
    </AlertContext.Provider>
  );
}
