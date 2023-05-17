export type Tags = {
  tagName: string
}

export type Article = {
  _id: string
  author: {
    _id: string
    username: string
  }
  title: string
  content: string
  tags?: Tags[]
}

export interface ArticleListLoaderProps {
  articles: Article[];
}
