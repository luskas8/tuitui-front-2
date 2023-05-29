import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import { retriveUserID } from "../../utilities/localStorage";

export default function ProfileIndex() {
  const { authenticated } = useAuth();

  if (!authenticated) {
    return <Navigate to="/auth/login" />
  }

  const userID = retriveUserID();
  return <Navigate to={`/profile/${userID}`} />
}
