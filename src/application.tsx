import { AuthenticationProvider } from "./contexts/Authentication";
import { FormProvider } from "./contexts/Form";
import ModalProvider from "./contexts/Modal";
import Routes from "./routes";

import "./styles/global.css";

export default function Application() {
  return (
    <FormProvider>
      <ModalProvider>
        <AuthenticationProvider>
          <Routes />
        </AuthenticationProvider>
      </ModalProvider>
    </FormProvider>
  );
}
