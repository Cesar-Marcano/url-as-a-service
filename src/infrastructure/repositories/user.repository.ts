import { Pool } from 'pg'
import { UserEntity } from '../../domain/entities/user.entity'
import { IUserRepository } from '../../domain/repositories/user.repository'
import { SqlQuery } from '../../shared/interfaces/sql-query.type'
import { UserMapper } from '../../application/mappers/user.mapper'
import {
  createSqlRunner,
  SqlRunnerScope,
} from '../../shared/utils/createSqlRunner'

export class UserRepository implements IUserRepository {
  private readonly createUserQuery: SqlQuery
  private readonly checkUserByEmailQuery: SqlQuery

  constructor(private readonly db: Pool) {
    this.createUserQuery = createSqlRunner(
      'users/createUser.sql',
      SqlRunnerScope.Queries,
    )

    this.checkUserByEmailQuery = createSqlRunner(
      'users/checkUserByEmail.sql',
      SqlRunnerScope.Queries,
    )
  }

  getUserById(_id: number): Promise<UserEntity | null> {
    throw new Error('Method not implemented.')
  }

  getUserByEmail(_email: string): Promise<UserEntity | null> {
    throw new Error('Method not implemented.')
  }

  async checkUserByEmail(email: string): Promise<boolean> {
    const result = await this.checkUserByEmailQuery(this.db, [email])

    return result.rows[0]?.exists ?? false
  }

  async createUser(user: UserEntity): Promise<UserEntity> {
    const newUser = await this.createUserQuery(this.db, [
      user.email.toString(),
      user.password.toString(),
      user.userType,
    ])

    if (!newUser.rows[0]) {
      throw new Error('Error creating user')
    }

    return UserMapper.fromDB(newUser.rows[0])
  }

  updateUser(
    _id: number,
    _user: Partial<UserEntity>,
  ): Promise<UserEntity | null> {
    throw new Error('Method not implemented.')
  }

  deleteUser(_id: number): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}
