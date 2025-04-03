import { UserEntity } from '../../domain/entities/user.entity'
import { UserDTO } from '../dtos/user.dto'

export class UserMapper {
  static toDTO(user: UserEntity): UserDTO {
    return {
      id: user.id,
      username: user.username?.toString() ?? null,
      email: user.email.toString(),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      userType: user.userType,
      isEmailConfirmed: user.isEmailConfirmed,
      is2FAEnabled: user.is2FAEnabled,
    }
  }
}
