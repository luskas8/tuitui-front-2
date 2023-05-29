import { AxiosError } from "axios";

export function apiErrorHandle(error: AxiosError) {
  if (error.response) {
    return error.response;
  }

  return {
    status: 500,
    data: {
      message: "Something went wrong",
    }
  }
}
