import { useContext } from "react";
import { FormContext } from "../contexts/Form";
import { ModalContext } from "../contexts/Modal";
import { AuthenticationContext } from "../contexts/Authentication";

export function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
}

export function useForm() {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("useForm must be used within a FormProvider");
  }

  return context;
}

export function useAuth() {
  const context = useContext(AuthenticationContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthenticationProvider");
  }

  return context;
}
