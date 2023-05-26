import { Article } from "../@types/article";
import { APIError } from "../@types/global";
import { retriveUserAuthToken } from "../utilities/localStorage";
import { api } from "./api";
import { upsertTags } from "./tags";

export async function retrieveArticlesByAuthorID(authorID: string): Promise<Article[] | APIError> {
  const token = retriveUserAuthToken();
  const response = await api.get(`/articles`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    params: {
      authorId: authorID
    }
  }).then(response => response).catch(error => error.response)

  if (response.status !== 200) {
    return {
      message: response.data.message,
      status: response.status,
    }
  }

  return response.data.data;
}

export async function retrieveArticleByID(articleID: string): Promise<Article | APIError> {
  const token = retriveUserAuthToken();
  const response = await api.get(`/articles`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    params: {
      id: articleID
    }
  }).then(response => response).catch(error => error.response)

  if (response.status !== 200) {
    return {
      message: response.data.message,
      status: response.status,
    };
  }

  return response.data.data[0];
}

interface SaveArticleInformationsResponse {
  updatedArticle: {
		author: string,
		title: string,
		content: string,
		tags: [{ tagName: string }],
		_id: string
  }
}

export async function saveArticleInformations(article: Article) {
  const token = retriveUserAuthToken();

  const response = await api.put(`/articles`, {
    articleId: article._id,
    title: article.title,
    content: article.content,
    tags: article.tags,
  }, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  })

  if (response.status !== 200) {
    return null;
  }

  const responseData = response.data as SaveArticleInformationsResponse;

  await upsertTags(responseData.updatedArticle.tags.map(tag => tag.tagName));

  return responseData.updatedArticle;
}
