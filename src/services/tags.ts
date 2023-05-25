import { retriveUserAuthToken } from "../utilities/localStorage";
import { api } from "./api";

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
