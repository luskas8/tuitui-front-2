import { redirect } from "react-router-dom";

export default function Index() {
  return null
}

export async function loader() {
  return redirect("/homepage");
}
