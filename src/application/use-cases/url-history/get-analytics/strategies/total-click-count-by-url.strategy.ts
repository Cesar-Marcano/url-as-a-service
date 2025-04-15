import { IUrlClickRepository } from '@domain/repositories/url-click.repository'
import {
  GetAnalyticsInput,
  TotalClickCountByUrlsInput,
} from '../get-analytics.input'
import {
  GetAnalyticsOutput,
  GetAnalyticsStrategy,
} from '../get-analytics.strategy'

export class TotalClickCountByUrlStrategy implements GetAnalyticsStrategy {
  constructor(private urlClickRepository: IUrlClickRepository) {}

  canHandle(input: GetAnalyticsInput): boolean {
    return 'userId' in input
  }

  async execute(input: GetAnalyticsInput): Promise<GetAnalyticsOutput> {
    const { userId } = input as TotalClickCountByUrlsInput

    const data = await this.urlClickRepository.getTotalClickCountByUrls(userId)

    return data
  }
}
