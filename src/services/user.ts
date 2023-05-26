import { APIError } from "../@types/global";
import { APIUser, User } from "../@types/user";
import { retriveUserAuthToken } from "../utilities/localStorage";
import { api } from "./api";

export async function retrieveUserByID(userID: string): Promise<User | APIError> {
  const token = retriveUserAuthToken();
  const response = await api.get(`/users`, {
    headers: {
      "Authorization": `Bearer ${token!}`,
    },
    params: {
      userId: userID,
    }
  }).then(response => response).catch(error => error.response);

  if (response.status !== 200) {
    return { message: response.data.message, status: response.status } as APIError;
  }

  return response.data.users[0] as User;
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
  }).then(response => response).catch(error => error.response);

  if (response.status !== 200) {
    return false;
  }

  return true;
}

export async function loginUser(payload: { userEmail: string, password: string }): Promise<APIUser | APIError> {
  const response = await api.post('/users/signin', payload).then(response => response).catch(error => error.response);

    if (response.status !== 200) {
      return {
        message: response.data.message,
        status: response.status,
      } as APIError;
    }

    return { user: response.data.user as User, token: response.data.token as string };
}

export async function registerUser(values : { email: string, username: string, password: string, confirm_password: string}): Promise<APIUser | APIError> {
  const payload = {
    userEmail: values.email,
    username: values.username,
    password: values.password,
    description: "This is a description",
  };

  const response = await api.post('/users/signup', payload).then(response => response).catch(error => error.response);

  if (response.status !== 201) {
    return {
      message: response.data.message,
      status: response.status,
    }
  }

  return { user: response.data.user as User, token: response.data.token as string };
}
