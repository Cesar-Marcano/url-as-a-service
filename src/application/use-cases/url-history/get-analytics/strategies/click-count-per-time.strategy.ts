import { IUrlClickRepository } from '@domain/repositories/url-click.repository'
import {
  GetAnalyticsInput,
  GetClickCountPerTimeInput,
} from '../get-analytics.input'
import {
  GetAnalyticsOutput,
  GetAnalyticsStrategy,
} from '../get-analytics.strategy'

export class ClickCountPerTimeStrategy implements GetAnalyticsStrategy {
  constructor(private urlClickRepository: IUrlClickRepository) {}

  canHandle(input: GetAnalyticsInput): boolean {
    return 'clickCountPerTimeInput' in input
  }

  async execute(input: GetAnalyticsInput): Promise<GetAnalyticsOutput> {
    const {
      clickCountPerTimeInput: { timeUnit, urlId },
    } = input as GetClickCountPerTimeInput

    const data = await this.urlClickRepository.getClickCountPerTime(
      timeUnit,
      urlId,
    )

    return data
  }
}
