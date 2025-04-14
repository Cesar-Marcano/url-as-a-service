import { UrlMapper } from '@app/mappers/url.mapper'
import { UrlEntity } from '@domain/entities/url.entity'
import { IUrlRepository } from '@domain/repositories/url.repository'
import { SqlQuery } from '@shared/interfaces/sql-query.type'
import { createSqlRunner, SqlRunnerScope } from '@shared/utils/createSqlRunner'
import { Pool } from 'pg'

export class UrlRepository implements IUrlRepository {
  // DQL
  private readonly findUrlBySlugQuery: SqlQuery

  // DML
  private readonly createUrlQuery: SqlQuery

  constructor(private readonly db: Pool) {
    // DQL
    this.findUrlBySlugQuery = createSqlRunner(
      'urls/findUrlBySlug.sql',
      SqlRunnerScope.Queries,
    )

    // DML
    this.createUrlQuery = createSqlRunner(
      'urls/createUrl.sql',
      SqlRunnerScope.Queries,
    )
  }

  findById(_id: number): Promise<UrlEntity | null> {
    throw new Error('Method not implemented.')
  }

  async findBySlug(slug: string): Promise<UrlEntity | null> {
    const result = await this.findUrlBySlugQuery(this.db, [slug])

    if (result.rowCount === 0) {
      return null
    }

    return UrlMapper.fromDB(result.rows[0])
  }

  findByLongUrl(_originalUrl: string): Promise<UrlEntity | null> {
    throw new Error('Method not implemented.')
  }

  async create(url: UrlEntity): Promise<UrlEntity> {
    const result = await this.createUrlQuery(this.db, [
      url.slug,
      url.originalUrl,
      url.author!.id,
      url.expirationDate,
    ])

    return UrlMapper.fromDB(result.rows[0])
  }

  update(_url: Partial<UrlEntity>): Promise<UrlEntity> {
    throw new Error('Method not implemented.')
  }

  delete(_id: number): Promise<void> {
    throw new Error('Method not implemented.')
  }

  getAll(): Promise<UrlEntity[]> {
    throw new Error('Method not implemented.')
  }

  count(): Promise<number> {
    throw new Error('Method not implemented.')
  }

  getAllByUserId(_userId: number): Promise<UrlEntity[]> {
    throw new Error('Method not implemented.')
  }

  countByUserId(_userId: number): Promise<number> {
    throw new Error('Method not implemented.')
  }
}
