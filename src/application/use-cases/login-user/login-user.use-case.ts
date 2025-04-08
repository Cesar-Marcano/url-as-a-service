import { IUserRepository } from '../../../domain/repositories/user.repository'
import { UserDTO } from '../../dtos/user.dto'
import { UseCase } from '../../interfaces/use-case.interface'
import { UserMapper } from '../../mappers/user.mapper'
import { LoginUserInput } from './login-user.input'

export class LoginUserUseCase implements UseCase<LoginUserInput, UserDTO> {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: LoginUserInput): Promise<UserDTO> {
    const { email, password } = input

    const user = await this.userRepository.getUserByEmail(email)
    if (!user || !user.password.compare(password)) {
      throw new Error('Invalid email or password')
    }

    return UserMapper.toDTO(user)
  }
}
