import { IUserRepository } from '../../../domain/repositories/user.repository'
import { UnauthorizedErrorException } from '../../../shared/errors/unauthorized.error'
import { UserDTO } from '../../dtos/user.dto'
import { UseCase } from '../../interfaces/use-case.interface'
import { UserMapper } from '../../mappers/user.mapper'
import { LoginUserInput } from './login-user.input'

export class LoginUserUseCase implements UseCase<LoginUserInput, UserDTO> {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: LoginUserInput): Promise<UserDTO> {
    const { email, password } = input

    const user = await this.userRepository.getUserByEmail(email)
    const areNotPasswordsEqual = await user?.password.compare(password)
    if (!user || !areNotPasswordsEqual) {
      throw new UnauthorizedErrorException('Invalid email or password')
    }

    return UserMapper.toDTO(user)
  }
}
