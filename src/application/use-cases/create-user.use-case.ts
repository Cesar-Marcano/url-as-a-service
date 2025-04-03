import { UserEntity, UserType } from '../../domain/entities/user.entity'
import { IUserRepository } from '../../domain/repositories/user.repository'
import { Email } from '../../domain/value-objects/email.value-object'
import { Password } from '../../domain/value-objects/password.value-object'
import { UserDTO } from '../dtos/user.dto'
import { UseCase } from '../interfaces/use-case.interface'
import { UserMapper } from '../mappers/user.mapper'

export interface CreateUserInput {
  email: string
  password: string,
  userType: UserType
}

export class CreateUserUseCase implements UseCase<CreateUserInput, UserDTO> {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ email, password, userType }: CreateUserInput): Promise<UserDTO> {
    const user = UserEntity.create(
      new Email(email),
      await Password.create(password),
      userType,
    )

    const newUser = await this.userRepository.createUser(user)

    return UserMapper.toDTO(newUser)
  }
}
