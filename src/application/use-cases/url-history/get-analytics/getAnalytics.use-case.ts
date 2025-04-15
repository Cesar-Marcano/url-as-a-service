import { UseCase } from '@app/interfaces/use-case.interface'
import { GetAnalyticsInput } from './get-analytics.input'
import {
  GetAnalyticsOutput,
  GetAnalyticsStrategy,
} from './get-analytics.strategy'

export class GetAnalyticsUseCase
  implements UseCase<GetAnalyticsInput, GetAnalyticsOutput>
{
  constructor(private readonly strategies: GetAnalyticsStrategy[]) {}

  async execute(input: GetAnalyticsInput): Promise<GetAnalyticsOutput> {
    const strategy = this.strategies.find((s) => s.canHandle(input))
    if (!strategy) throw new Error('No strategy found for given input')

    return strategy.execute(input)
  }
}
