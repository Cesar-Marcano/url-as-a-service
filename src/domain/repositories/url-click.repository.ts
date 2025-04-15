import { UrlClickEntity } from '@domain/entities/url-click.entity'

export type TotalClickCountByUrls = Array<{
  url_id: number
  click_count: number
}>

export type ClickCountPerTime = Array<{ time: string; count: number }>

export type GeoAnalytics = Array<{
  country: string
  city: string
  count: number
}>

export type UserAgentAnalytics = Array<{ userAgent: string; count: number }>

export interface IUrlClickRepository {
  registerClick(urlClick: UrlClickEntity): Promise<void>

  getTotalClickCountByUrls(userId: number): Promise<TotalClickCountByUrls>

  getClickCountPerTime(
    timeUnit: 'day' | 'week' | 'month',
    urlId: number,
  ): Promise<ClickCountPerTime>

  getGeoAnalytics(urlId: number): Promise<GeoAnalytics>

  getUserAgentAnalytics(urlId: number): Promise<UserAgentAnalytics>
}
