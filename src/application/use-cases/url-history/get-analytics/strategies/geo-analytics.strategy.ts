import { IUrlClickRepository } from '@domain/repositories/url-click.repository'
import { GetAnalyticsInput, GetGeoAnalyticsInput } from '../get-analytics.input'
import {
  GetAnalyticsOutput,
  GetAnalyticsStrategy,
} from '../get-analytics.strategy'

export class GeoAnalyticsStrategy implements GetAnalyticsStrategy {
  constructor(private urlClickRepository: IUrlClickRepository) {}

  canHandle(input: GetAnalyticsInput): boolean {
    return 'geoAnalyticsInput' in input
  }

  async execute(input: GetAnalyticsInput): Promise<GetAnalyticsOutput> {
    const {
      geoAnalyticsInput: { urlId },
    } = input as GetGeoAnalyticsInput

    const data = await this.urlClickRepository.getGeoAnalytics(urlId)

    return data
  }
}
