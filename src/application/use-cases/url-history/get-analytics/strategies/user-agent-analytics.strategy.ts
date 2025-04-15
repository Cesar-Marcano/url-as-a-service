import { IUrlClickRepository } from '@domain/repositories/url-click.repository'
import {
  GetAnalyticsInput,
  GetUserAgentAnalyticsInput,
} from '../get-analytics.input'
import {
  GetAnalyticsOutput,
  GetAnalyticsStrategy,
} from '../get-analytics.strategy'

export class UserAgentAnalyticsStrategy implements GetAnalyticsStrategy {
  constructor(private urlClickRepository: IUrlClickRepository) {}

  canHandle(input: GetAnalyticsInput): boolean {
    return 'urlId' in input
  }

  async execute(input: GetAnalyticsInput): Promise<GetAnalyticsOutput> {
    const { urlId } = input as GetUserAgentAnalyticsInput

    const data = await this.urlClickRepository.getUserAgentAnalytics(urlId)

    return data
  }
}
