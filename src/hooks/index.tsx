import { useContext } from "react";
import { FormContext } from "../contexts/Form";
import { ModalContext } from "../contexts/Modal";
import { AuthenticationContext } from "../contexts/Authentication";
import { AlertContext } from "../contexts/Alert";

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

export function useAlert() {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error("useAlert must be used within a AlertProvider");
  }

  return context;
}
