import { UrlEntity } from './url.entity'
import { SubscriptionHistoryEntity } from './subscription-history.entity'
import { Email } from '@domain/value-objects/email.value-object'
import { Username } from '@domain/value-objects/username.value-object'
import { Password } from '@domain/value-objects/password.value-object'

export enum UserType {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
  READONLY = 'readonly',
}

export class UserEntity {
  constructor(
    public readonly id: number | null,
    public readonly email: Email,
    public readonly username: Username | null,
    public readonly password: Password,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly urls: UrlEntity[] | null = null,
    public readonly subscriptionHistory:
      | SubscriptionHistoryEntity[]
      | null = null,
    public readonly userType: UserType,
    public readonly isEmailConfirmed: boolean,
    public readonly is2FAEnabled: boolean,
  ) {}

  static create(
    email: Email,
    password: Password,
    userType: UserType,
  ): UserEntity {
    const now = new Date()

    return new UserEntity(
      null,
      email,
      null,
      password,
      now,
      now,
      null,
      null,
      userType,
      false,
      false,
    )
  }
}
