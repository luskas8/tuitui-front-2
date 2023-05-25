import { User } from "../@types/user";
import { retriveUserAuthToken } from "../utilities/localStorage";
import { api } from "./api";

export async function retrieveUserByID(userID: string): Promise<User | null> {
  const token = retriveUserAuthToken();
  const response = await api.get(`/users`, {
    headers: {
      "Authorization": `Bearer ${token!}`,
    },
    params: {
      userId: userID,
    }
  })

  if (response.status !== 200) {
    return null;
  }

  return response.data.users[0];
}

export async function saveUserInformations(userInformation: { username: string, description: string }): Promise<boolean> {
  const token = retriveUserAuthToken();
  const response = await api.put(`/users`, {
    username: userInformation.username,
    description: userInformation.description,
  }, {
    headers: {
      "Authorization": `Bearer ${token!}`,
    }
  })

  if (response.status !== 200) {
    return false;
  }

  return true;
}
