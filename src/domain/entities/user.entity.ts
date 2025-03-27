import { Email } from '@domain/value-objects/email.value-object'
import { SubscriptionEntity } from './subscription.entity'
import { UrlEntity } from './url.entity'
import { Username } from '@domain/value-objects/username.value-object'
import { Password } from '@domain/value-objects/password.value-object'

export enum UserType {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
  READONLY = 'readonly',
}

export enum SubscriptionType {
  ANUAL = 'anual',
  MONTHLY = 'monthly',
  WEEKLY = 'weekly',
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
    public readonly subscription: SubscriptionEntity,
    public readonly subscriptionType: SubscriptionType,
    public readonly subscriptionRenewalDate: Date,
    public readonly subscriptionCanceledAt: Date | null,
    public readonly subscriptionAquiredAt: Date,
    public readonly userType: UserType,
  ) {}
}
