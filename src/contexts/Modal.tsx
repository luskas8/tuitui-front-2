import { createContext, useState } from "react";
import { BaseChildrenProps } from "../@types/global";

interface ModalContext {
  isVisible: boolean;
  toggleVisibility: () => void;
}

export const ModalContext = createContext({} as ModalContext);

interface ModalProviderProps extends BaseChildrenProps {}


export default function ModalProvider({ children }: ModalProviderProps) {
  const [modalVisibilityState, updateModalVisibility] = useState<boolean>(false);

  function toggleVisibility() {
    updateModalVisibility(currentVisibility => !currentVisibility);
  }

  return <ModalContext.Provider value={{ isVisible: modalVisibilityState, toggleVisibility }}>
      {children}
    </ModalContext.Provider>
}
