import { UseCase } from '@app/interfaces/use-case.interface'
import { GetAnalyticsInput } from './get-analytics.input'
import { GetAnalyticsOutput } from './get-analytics.strategy'

export class GetAnalyticsUseCase
  implements UseCase<GetAnalyticsInput, GetAnalyticsOutput>
{
  constructor() {}

  async execute(input: GetAnalyticsInput): Promise<GetAnalyticsOutput> {
    if (!input.strategy) throw new Error('No strategy found for given input')

    return input.strategy.execute(input)
  }
}
