import { AlertProvider } from "./contexts/Alert";
import { AuthenticationProvider } from "./contexts/Authentication";
import { FormProvider } from "./contexts/Form";
import ModalProvider from "./contexts/Modal";
import Routes from "./routes";

import 'flowbite';
import "./styles/global.css";

export default function Application() {
  return (
    <FormProvider>
      <AlertProvider>
        <ModalProvider>
          <AuthenticationProvider>
            <Routes />
          </AuthenticationProvider>
        </ModalProvider>
      </AlertProvider>
    </FormProvider>
  );
}
