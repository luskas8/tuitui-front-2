import { TagSearched } from "../@types/article";
import { APIError } from "../@types/global";
import { retriveUserAuthToken } from "../utilities/localStorage";
import { api } from "./api";
import { apiErrorHandle } from "./errors";

export async function upsertTags(tags: string[]): Promise<string[]> {
  console.log("upsertTags", tags)
  const token = retriveUserAuthToken();

  const response = await api.post(`/tags`, {
    tagList: tags,
  }, {
    headers: {
      "Authorization": `Bearer ${token!}`,
    }
  })

  console.log("upsertTags done", response)

  if (response.status !== 201) {
    return [];
  }

  return response.data.tags;
}

export async function retriveTags(tagName: string): Promise<TagSearched[] | APIError> {
  const token = retriveUserAuthToken();
  const response = await api.get("/tags", {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    params: {
      tagName,
    }
  }).then(response => response).catch(apiErrorHandle);

  if (response.status !== 200) {
    return {
      message: response.data.message,
      status: response.status,
    };
  }

  return response.data.data;
}
