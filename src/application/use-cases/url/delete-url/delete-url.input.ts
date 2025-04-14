import { UserType } from '@domain/entities/user.entity'

export interface DeleteUrlInput {
  urlId: number
  user: {
    id: number
    userType: UserType
  }
}
