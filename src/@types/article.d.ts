import { User } from "./user"

export type Tags = {
  tagName: string
}

export type TagSearched = {
  tagName: string
  _id: string
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
