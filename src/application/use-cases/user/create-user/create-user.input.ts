import { type UserType } from '../../../domain/entities/user.entity'

export interface CreateUserInput {
  email: string
  password: string
  userType: UserType
}
