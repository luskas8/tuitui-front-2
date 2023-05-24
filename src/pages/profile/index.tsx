import { redirect } from "react-router-dom";

export default function ProfileIndex() {
  return null
}

// TODO: Replace AUTHOR_ID with the author's ID

export async function loader() {
  return redirect("/profile/AUTHOR_ID");
}
