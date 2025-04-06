import { UserEntity } from '../../domain/entities/user.entity'
import { Email } from '../../domain/value-objects/email.value-object'
import { Password } from '../../domain/value-objects/password.value-object'
import { Username } from '../../domain/value-objects/username.value-object'
import { UserDTO } from '../dtos/user.dto'

export class UserMapper {
  static toDTO(user: UserEntity): UserDTO {
    return {
      id: user.id ?? 0,
      username: user.username?.toString() ?? null,
      email: user.email.toString(),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      userType: user.userType,
      isEmailConfirmed: user.isEmailConfirmed,
      is2FAEnabled: user.is2FAEnabled,
    }
  }

  static fromDB(row: any): UserEntity {
    return new UserEntity(
      row.id,
      new Email(row.email),
      row.username ? new Username(row.username) : null,
      new Password(row.password),
      new Date(row.created_at),
      new Date(row.updated_at),
      row.urls ?? null,
      row.subscription_history ?? null,
      row.user_type,
      row.is_email_confirmed ?? false,
      row.is_2fa_enabled ?? true,
    )
  }
}
