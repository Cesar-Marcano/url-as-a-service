import { UrlClickEntity } from '../entities/url-click.entity'

export interface UrlClickFilter {
  fromIpAddress?: string
  fromUserAgent?: string
  startDate?: Date
  endDate?: Date
}

export interface UrlClickRepository {
  registerClick(urlClick: UrlClickEntity): Promise<UrlClickEntity>

  getClickCountByUrlId(urlId: string, filters?: UrlClickFilter): Promise<number>
}
