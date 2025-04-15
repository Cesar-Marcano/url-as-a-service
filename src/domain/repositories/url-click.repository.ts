import { UrlClickEntity } from '@domain/entities/url-click.entity'

export interface UrlClickFilter {
  fromIpAddress?: string
  fromUserAgent?: string
  startDate?: Date
  endDate?: Date
}

export interface IUrlClickRepository {
  registerClick(urlClick: UrlClickEntity): Promise<void>

  getTotalClickCountByUrls(userId: number): Promise<Record<number, number>>

  getClickCountPerTime(
    timeUnit: 'day' | 'week' | 'month',
    urlId: number,
  ): Promise<Array<{ time: string; count: number }>>

  getGeoAnalytics(
    urlId: number,
  ): Promise<Array<{ location: string; count: number }>>

  getUserAgentAnalytics(
    urlId: number,
  ): Promise<Array<{ userAgent: string; count: number }>>

  getClickCountByUrlId(urlId: number, filters?: UrlClickFilter): Promise<number>
}
