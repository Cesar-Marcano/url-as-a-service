import { UrlClickEntity } from '@domain/entities/url-click.entity'
import { IUrlClickRepository } from '@domain/repositories/url-click.repository'
import { SqlQuery } from '@shared/interfaces/sql-query.type'
import { createSqlRunner, SqlRunnerScope } from '@shared/utils/createSqlRunner'
import { Pool } from 'pg'

export class UrlClickRepository implements IUrlClickRepository {
  // DQL
  private readonly getClickCountPerTimeQuery: SqlQuery
  private readonly getGeoAnalyticsQuery: SqlQuery
  private readonly getTotalClickCountByUrlsQuery: SqlQuery
  private readonly getUserAgentAnalyticsQuery: SqlQuery

  // DML
  private readonly registerUrlClick: SqlQuery

  constructor(private readonly db: Pool) {
    // DQL
    this.getClickCountPerTimeQuery = createSqlRunner(
      'url_clicks/getClickCountPerTime.sql',
      SqlRunnerScope.Queries,
    )
    this.getGeoAnalyticsQuery = createSqlRunner(
      'url_clicks/getGeoAnalytics.sql',
      SqlRunnerScope.Queries,
    )
    this.getTotalClickCountByUrlsQuery = createSqlRunner(
      'url_clicks/getTotalClickCountByUrls.sql',
      SqlRunnerScope.Queries,
    )
    this.getUserAgentAnalyticsQuery = createSqlRunner(
      'url_clicks/getUserAgentAnalytics.sql',
      SqlRunnerScope.Queries,
    )

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

  async getTotalClickCountByUrls(
    userId: number,
  ): Promise<Array<{ url_id: number; click_count: number }>> {
    const result = await this.getTotalClickCountByUrlsQuery(this.db, [userId])

    return result.rows
  }

  async getClickCountPerTime(
    timeUnit: 'day' | 'week' | 'month',
    urlId: number,
  ): Promise<Array<{ time: string; count: number }>> {
    const result = await this.getClickCountPerTimeQuery(this.db, [
      timeUnit,
      urlId,
    ])

    return result.rows
  }

  async getGeoAnalytics(
    urlId: number,
  ): Promise<Array<{ country: string; city: string; count: number }>> {
    const result = await this.getGeoAnalyticsQuery(this.db, [urlId])

    return result.rows
  }

  async getUserAgentAnalytics(
    urlId: number,
  ): Promise<Array<{ userAgent: string; count: number }>> {
    const result = await this.getUserAgentAnalyticsQuery(this.db, [urlId])

    return result.rows.map((row) => ({
      userAgent: row['user_agent'],
      count: row['count'],
    }))
  }
}
