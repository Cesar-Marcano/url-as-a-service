import { Pool } from 'pg'
import { UserEntity } from '../../domain/entities/user.entity'
import { IUserRepository } from '../../domain/repositories/user.repository'
import { SqlQuery } from '../../shared/interfaces/sql-query.type'
import { UserMapper } from '../../application/mappers/user.mapper'

export class UserRepository implements IUserRepository {
  constructor(
    private readonly db: Pool,
    private readonly createUserQuery: SqlQuery,
  ) {}

  getUserById(_id: number): Promise<UserEntity | null> {
    throw new Error('Method not implemented.')
  }

  getUserByEmail(_email: string): Promise<UserEntity | null> {
    throw new Error('Method not implemented.')
  }

  async createUser(user: UserEntity): Promise<UserEntity> {
    const newUser = await this.createUserQuery(this.db, [
      user.email,
      user.password,
      user.userType,
    ])

    if (!newUser.rows[0]) {
      throw new Error('Error creating user')
    }

    return UserMapper.fromDB(newUser.rows[0])
  }

  updateUser(
    _id: string,
    _user: Partial<UserEntity>,
  ): Promise<UserEntity | null> {
    throw new Error('Method not implemented.')
  }

  deleteUser(_id: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}
