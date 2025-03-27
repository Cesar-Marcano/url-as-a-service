import { SubscriptionEntity } from './subscription.entity'
import { UrlEntity } from './url.entity'

export enum UserType {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
  READONLY = 'readonly',
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
    public readonly userType: UserType,
  ) {}
}
