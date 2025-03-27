import { SubscriptionEntity } from './subscription.entity'
import { UserEntity } from './user.entity'

export enum SubscriptionType {
  ANUAL = 'anual',
  MONTHLY = 'monthly',
  WEEKLY = 'weekly',
}

export class SubscriptionHistoryEntity {
  constructor(
    public readonly id: number,
    public readonly user: UserEntity,
    public readonly subscription: SubscriptionEntity,
    public readonly subscriptionType: SubscriptionType,
    public readonly startedAt: Date,
    public readonly endsAt: Date,
    public readonly renewalDate: Date | null,
    public readonly canceledAt: Date | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  public isActive(): boolean {
    return this.canceledAt === null && this.endsAt > new Date()
  }
}
