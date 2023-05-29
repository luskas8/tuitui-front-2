export type User = {
  _id: string
  username: string
  userEmail: string
  description: string
}

export type APIUser = { user: User, token: string }
