import { User } from "./user"

export type Tags = {
  tagName: string
}

export type Article = {
  _id: string
  author: User
  title: string
  content: string
  tags?: Tags[]
}

export interface ArticleListLoaderProps {
  articles: Article[];
}
