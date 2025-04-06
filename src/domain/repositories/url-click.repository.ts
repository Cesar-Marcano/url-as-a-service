import { UrlClickEntity } from '../entities/url-click.entity'

export interface UrlClickFilter {
  fromIpAddress?: string
  fromUserAgent?: string
  startDate?: Date
  endDate?: Date
}

export interface IUrlClickRepository {
  registerClick(urlClick: UrlClickEntity): Promise<UrlClickEntity>

  getClickCountByUrlId(urlId: number, filters?: UrlClickFilter): Promise<number>
}
