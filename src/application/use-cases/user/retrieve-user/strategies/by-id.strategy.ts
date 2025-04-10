import { IUserRepository } from '../../../../../domain/repositories/user.repository'
import { NotFoundErrorException, NotFoundErrorExceptionScope } from '../../../../../shared/errors/not-found.error'
import { UserDTO } from '../../../../dtos/user.dto'
import { UserMapper } from '../../../../mappers/user.mapper'
import { RetrieveUserStrategy } from '../reteive-user.strategy'
import { RetrieveUserInput, UserInputById } from '../retrieve-user.input'

export class RetrieveUserByIdStrategy implements RetrieveUserStrategy {
  constructor(private readonly userRepository: IUserRepository) {}

  canHandle(input: RetrieveUserInput): boolean {
    return 'id' in input
  }

  async execute(input: RetrieveUserInput): Promise<UserDTO> {
    const user = await this.userRepository.getUserById(
      (input as UserInputById).id,
    )
    if (!user) throw new NotFoundErrorException(NotFoundErrorExceptionScope.DATABASE, 'user')
    return UserMapper.toDTO(user)
  }
}
