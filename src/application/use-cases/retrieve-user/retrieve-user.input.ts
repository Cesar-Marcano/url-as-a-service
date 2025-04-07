export interface UserInputById {
  id: number
}

export interface UserInputByEmail {
  email: string
}

export interface UserInputByUsername {
  username: string
}

export type RetrieveUserInput =
  | UserInputById
  | UserInputByEmail
  | UserInputByUsername
