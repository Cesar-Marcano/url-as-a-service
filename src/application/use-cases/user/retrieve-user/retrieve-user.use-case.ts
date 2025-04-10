import { UserDTO } from '../../dtos/user.dto'
import { UseCase } from '../../interfaces/use-case.interface'
import { RetrieveUserStrategy } from './reteive-user.strategy'
import { RetrieveUserInput } from './retrieve-user.input'

export class RetrieveUserUseCase
  implements UseCase<RetrieveUserInput, UserDTO>
{
  constructor(private readonly strategies: RetrieveUserStrategy[]) {}

  async execute(input: RetrieveUserInput): Promise<UserDTO> {
    const strategy = this.strategies.find((s) => s.canHandle(input))
    if (!strategy) throw new Error('No strategy found for given input')

    return strategy.execute(input)
  }
}
