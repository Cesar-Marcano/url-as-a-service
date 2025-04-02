import { UserEntity } from '../entities/user.entity'

export interface IUserRepository {
  getUserById(id: number): Promise<UserEntity | null>
  getUserByEmail(email: string): Promise<UserEntity | null>
  createUser(user: UserEntity): Promise<UserEntity>
  updateUser(id: string, user: Partial<UserEntity>): Promise<UserEntity | null>
  deleteUser(id: string): Promise<boolean>
}
