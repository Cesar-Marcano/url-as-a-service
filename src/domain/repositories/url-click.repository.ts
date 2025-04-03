import { UrlClickEntity } from '../entities/url-click.entity'

export interface UrlRepository {
  registerClick(urlClick: UrlClickEntity): Promise<UrlClickEntity>
  getClickCountByUrlId(urlId: string): Promise<number>
  getClickCountBetweenDates(
    urlId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<number>
}
