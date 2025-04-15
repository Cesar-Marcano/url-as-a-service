import { UrlClickEntity } from '@domain/entities/url-click.entity'

export interface IUrlClickRepository {
  registerClick(urlClick: UrlClickEntity): Promise<void>

  getTotalClickCountByUrls(
    userId: number,
  ): Promise<Array<{ url_id: number; click_count: number }>>

  getClickCountPerTime(
    timeUnit: 'day' | 'week' | 'month',
    urlId: number,
  ): Promise<Array<{ time: string; count: number }>>

  getGeoAnalytics(
    urlId: number,
  ): Promise<Array<{ country: string; city: string; count: number }>>

  getUserAgentAnalytics(
    urlId: number,
  ): Promise<Array<{ userAgent: string; count: number }>>
}
