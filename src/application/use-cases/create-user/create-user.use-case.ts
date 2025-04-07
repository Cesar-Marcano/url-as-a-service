import { UserEntity } from '../../../domain/entities/user.entity'
import { IUserRepository } from '../../../domain/repositories/user.repository'
import { Email } from '../../../domain/value-objects/email.value-object'
import { Password } from '../../../domain/value-objects/password.value-object'
import { DuplicateKeyError } from '../../../shared/errors/duplicate-key.error'
import { UserDTO } from '../../dtos/user.dto'
import { UseCase } from '../../interfaces/use-case.interface'
import { UserMapper } from '../../mappers/user.mapper'
import { CreateUserInput } from './create-user.input'

export class CreateUserUseCase implements UseCase<CreateUserInput, UserDTO> {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({
    email,
    password,
    userType,
  }: CreateUserInput): Promise<UserDTO> {
    const userByEmail = await this.userRepository.getUserByEmail(email)

    if (userByEmail) {
      throw new DuplicateKeyError('email')
    }

    const user = UserEntity.create(
      new Email(email),
      await Password.create(password),
      userType,
    )

    const newUser = await this.userRepository.createUser(user)

    return UserMapper.toDTO(newUser)
  }
}
