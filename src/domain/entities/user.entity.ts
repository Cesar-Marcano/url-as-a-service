import { SubscriptionEntity } from './subscription.entity'
import { UrlEntity } from './url.entity'

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
    public readonly email: string,
    public readonly username: string,
    public readonly password: string,
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
