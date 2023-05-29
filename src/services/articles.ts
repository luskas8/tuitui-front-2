import { Article } from "../@types/article";
import { APIError } from "../@types/global";
import { retriveUserAuthToken } from "../utilities/localStorage";
import { api } from "./api";
import { apiErrorHandle } from "./errors";
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
  }).then(response => response).catch(apiErrorHandle)

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
  }).then(response => response).catch(apiErrorHandle)

  if (response.status !== 200) {
    return {
      message: response.data.message,
      status: response.status,
    };
  }
  const articles = response.data.data as Article[];
  if (articles.length === 0) {
    return {
      message: "Article not found",
      status: 404,
    };
  }

  return articles[0];
}

interface ArticleAPIResponse {
  author: string,
  title: string,
  content: string,
  tags: [{ tagName: string }],
  _id: string
}

export async function saveArticleInformations(article: Article): Promise<any | APIError> {
  const token = retriveUserAuthToken();

  const response = await api.put(`/articles`, {
    articleId: article._id,
    title: article.title,
    content: article.content,
    tags: article.tags || [],
  }, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  }).then(response => response).catch(apiErrorHandle);

  if (response.status !== 200) {
    return {
      message: response.data.message,
      status: response.status,
    };
  }

  const responseData = response.data as { updatedArticle: ArticleAPIResponse };

  if (responseData.updatedArticle.tags.length > 0) {
    await upsertTags(responseData.updatedArticle.tags.map(tag => tag.tagName));
  }

  return responseData.updatedArticle;
}

export async function createArticle(article: Article): Promise<ArticleAPIResponse | APIError> {
  const token = retriveUserAuthToken();

  const response = await api.post(`/articles`, {
    title: article.title,
    content: article.content,
    tags: article.tags || [],
  }, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  }).then(response => response).catch(apiErrorHandle);

  if (response.status !== 201) {
    return {
      message: response.data.message,
      status: response.status,
    };
  }

  const responseData = response.data as { article: ArticleAPIResponse };

  if (responseData.article.tags.length > 0) {
    await upsertTags(responseData.article.tags.map(tag => tag.tagName));
  }

  return responseData.article;
}

export async function retrieveArticlesByAuthorName(author: string): Promise<Article[] | APIError> {
  const token = retriveUserAuthToken();
  const response = await api.get(`/articles`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    params: {
      author,
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

export async function retrieveArticlesByTagName(tag: string): Promise<Article[] | APIError> {
  const token = retriveUserAuthToken();

  const response = await api.get(`/articles`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    params: {
      tags: JSON.stringify([tag]),
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

export async function deleteArticleByID(articleID: string) {
  const token = retriveUserAuthToken();

  const response = await api.delete(`/articles`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    params: {
      articleId: articleID,
    }
  }).then(response => response).catch(apiErrorHandle);

  if (response.status !== 200) {
    return {
      message: response.data.message,
      status: response.status,
    };
  }

  return response.data;
}
