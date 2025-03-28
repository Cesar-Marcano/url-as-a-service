import { UrlEntity } from './url.entity'
import { SubscriptionHistoryEntity } from './subscription-history.entity'
import { Email } from '../value-objects/email.value-object'
import { Username } from '../value-objects/username.value-object'
import { Password } from '../value-objects/password.value-object'

export enum UserType {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
  READONLY = 'readonly',
}

export class UserEntity {
  constructor(
    public readonly id: number,
    public readonly email: Email,
    public readonly username: Username,
    public readonly password: Password,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly urls: UrlEntity[],
    public readonly subscriptionHistory: SubscriptionHistoryEntity[],
    public readonly userType: UserType,
    public readonly isEmailConfirmed: boolean,
    public readonly is2FAEnabled: boolean,
  ) {}
}
