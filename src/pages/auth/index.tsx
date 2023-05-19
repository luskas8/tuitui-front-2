import { redirect } from "react-router-dom";

export default function AuthIndex() {
  return null
}

export async function loader() {
  return redirect("/auth/login");
}
