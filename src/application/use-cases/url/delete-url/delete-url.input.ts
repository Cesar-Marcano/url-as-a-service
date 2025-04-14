import { UserEntity } from '@domain/entities/user.entity'

export interface DeleteUrlInput {
  urlId: number
  user: UserEntity
}
