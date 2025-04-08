import { Pool } from 'pg'
import { UserEntity } from '../../domain/entities/user.entity'
import { IUserRepository } from '../../domain/repositories/user.repository'
import { SqlQuery } from '../../shared/interfaces/sql-query.type'
import { UserMapper } from '../../application/mappers/user.mapper'
import {
  createSqlRunner,
  SqlRunnerScope,
} from '../../shared/utils/createSqlRunner'
import {
  NotFoundErrorException,
  NotFoundErrorExceptionScope,
} from '../../shared/errors/not-found.error'

export class UserRepository implements IUserRepository {
  // DQL
  private readonly checkUserByEmailQuery: SqlQuery
  private readonly getUserByEmailQuery: SqlQuery
  private readonly getUserByUsernameQuery: SqlQuery
  private readonly getUserByIdQuery: SqlQuery

  // DML
  private readonly createUserQuery: SqlQuery

  constructor(private readonly db: Pool) {
    // DQL
    this.checkUserByEmailQuery = createSqlRunner(
      'users/checkUserByEmail.sql',
      SqlRunnerScope.Queries,
    )

    this.getUserByEmailQuery = createSqlRunner(
      'users/getUserByEmail.sql',
      SqlRunnerScope.Queries,
    )

    this.getUserByUsernameQuery = createSqlRunner(
      'users/getUserByUsername.sql',
      SqlRunnerScope.Queries,
    )

    this.getUserByIdQuery = createSqlRunner(
      'users/getUserById.sql',
      SqlRunnerScope.Queries,
    )

    // DML
    this.createUserQuery = createSqlRunner(
      'users/createUser.sql',
      SqlRunnerScope.Queries,
    )
  }

  async getUserByUsername(username: string): Promise<UserEntity | null> {
    const result = await this.getUserByUsernameQuery(this.db, [username])

    if (!result.rows[0]) {
      throw new NotFoundErrorException(
        NotFoundErrorExceptionScope.DATABASE,
        'user',
      )
    }

    return UserMapper.fromDB(result.rows[0])
  }

  async getUserById(id: number): Promise<UserEntity | null> {
    const result = await this.getUserByIdQuery(this.db, [id])

    if (!result.rows[0]) {
      throw new NotFoundErrorException(
        NotFoundErrorExceptionScope.DATABASE,
        'user',
      )
    }

    return UserMapper.fromDB(result.rows[0])
  }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    const result = await this.getUserByEmailQuery(this.db, [email])

    return !result.rows[0] ? null : UserMapper.fromDB(result.rows[0])
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
