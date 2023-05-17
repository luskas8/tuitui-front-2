import ModalProvider from "./contexts/Modal";
import Routes from "./routes"

import "./styles/global.css"

export default function Application() {
  return (
    <ModalProvider>
      <Routes />
    </ModalProvider>
  );
}
