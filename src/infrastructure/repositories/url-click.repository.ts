import { UrlClickEntity } from '@domain/entities/url-click.entity'
import {
  IUrlClickRepository,
  UrlClickFilter,
} from '@domain/repositories/url-click.repository'
import { SqlQuery } from '@shared/interfaces/sql-query.type'
import { createSqlRunner, SqlRunnerScope } from '@shared/utils/createSqlRunner'
import { Pool } from 'pg'

export class UrlClickRepository implements IUrlClickRepository {
  // DQL

  // DML
  private readonly registerUrlClick: SqlQuery

  constructor(private readonly db: Pool) {
    // DQL

    // DML
    this.registerUrlClick = createSqlRunner(
      'url_clicks/registerUrlClick.sql',
      SqlRunnerScope.Queries,
    )
  }

  async registerClick(urlClick: UrlClickEntity): Promise<void> {
    this.registerUrlClick(this.db, [
      urlClick.url?.id,
      urlClick.fromUserAgent,
      urlClick.fromIpAddress,
      urlClick.fromCountry,
      urlClick.fromCity,
    ])
  }

  getClickCountByUrlId(
    _urlId: number,
    _filters?: UrlClickFilter,
  ): Promise<number> {
    throw new Error('Method not implemented.')
  }

  getTotalClickCountByUrls(_userId: number): Promise<Record<number, number>> {
    throw new Error('Method not implemented.')
  }

  getClickCountPerTime(
    _timeUnit: 'day' | 'week' | 'month',
    _urlId: number,
  ): Promise<Array<{ time: string; count: number }>> {
    throw new Error('Method not implemented.')
  }

  getGeoAnalytics(
    _urlId: number,
  ): Promise<Array<{ location: string; count: number }>> {
    throw new Error('Method not implemented.')
  }

  getUserAgentAnalytics(
    _urlId: number,
  ): Promise<Array<{ userAgent: string; count: number }>> {
    throw new Error('Method not implemented.')
  }
}
