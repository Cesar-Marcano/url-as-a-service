import { UserType } from '../../../domain/entities/user.entity'

export interface RefreshTokenUseCaseInput {
  userId: number
  email: string
  role: UserType
}
