import { Article } from "../@types/article";
import { retriveUserAuthToken } from "../utilities/localStorage";
import { api } from "./api";
import { upsertTags } from "./tags";

export async function retrieveArticlesByAuthorID(authorID: string): Promise<Article[] | null> {
  const token = retriveUserAuthToken();
  const response = await api.get(`/articles`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    params: {
      authorId: authorID
    }
  })

  if (response.status !== 200) {
    return null;
  }

  return response.data.data;
}

export async function retrieveArticleByID(articleID: string): Promise<Article | null> {
  const token = retriveUserAuthToken();
  const response = await api.get(`/articles`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    params: {
      id: articleID
    }
  })

  if (response.status !== 200) {
    return null;
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
