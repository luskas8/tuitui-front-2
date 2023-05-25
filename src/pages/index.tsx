import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks";

export default function Index() {
  const { authenticated } = useAuth();

  if (!authenticated) {
    return <Navigate to="/auth/login" replace />
  }
  return <Navigate to="/homepage" replace />
}
