import { UserEntity } from '../entities/user.entity'

export interface IUserRepository {
  getUserById(id: number): Promise<UserEntity | null>
  getUserByEmail(email: string): Promise<UserEntity | null>
  createUser(user: UserEntity): Promise<UserEntity>
  updateUser(id: number, user: Partial<UserEntity>): Promise<UserEntity | null>
  deleteUser(id: number): Promise<boolean>
}
