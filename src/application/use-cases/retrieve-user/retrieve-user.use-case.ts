import { IUserRepository } from '../../../domain/repositories/user.repository'
import { UserDTO } from '../../dtos/user.dto'
import { UseCase } from '../../interfaces/use-case.interface'
import { RetrieveUserStrategy } from './reteive-user.strategy'
import { RetrieveUserInput } from './retrieve-user.input'
import { RetrieveUserByEmailStrategy } from './strategies/by-email.strategy'
import { RetrieveUserByIdStrategy } from './strategies/by-id.strategy'
import { RetrieveUserByUsernameStrategy } from './strategies/by-username.strategy'

export class RetrieveUserUseCase
  implements UseCase<RetrieveUserInput, UserDTO>
{
  private readonly strategies: RetrieveUserStrategy[]

  constructor(userRepository: IUserRepository) {
    this.strategies = [
      new RetrieveUserByIdStrategy(userRepository),
      new RetrieveUserByEmailStrategy(userRepository),
      new RetrieveUserByUsernameStrategy(userRepository),
    ]
  }

  async execute(input: RetrieveUserInput): Promise<UserDTO> {
    const strategy = this.strategies.find((s) => s.canHandle(input))
    if (!strategy) throw new Error('No strategy found for given input')

    return strategy.execute(input)
  }
}
