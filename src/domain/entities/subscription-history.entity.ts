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
    public readonly subscription: SubscriptionEntity | null,
    public readonly subscriptionType: SubscriptionType,
    public readonly startedAt: Date,
    public readonly canceledAt: Date | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  public isActive(date: Date = new Date()): boolean {
    if (this.canceledAt) {
      return false
    }

    const endsAt = this.getRenewalDate()

    return date < endsAt && this.startedAt <= date
  }

  public getRenewalDate(): Date {
    let renewalDate: Date = new Date(this.startedAt)

    switch (this.subscriptionType) {
      case SubscriptionType.ANUAL:
        renewalDate.setFullYear(renewalDate.getFullYear() + 1)
        break
      case SubscriptionType.MONTHLY:
        renewalDate.setMonth(renewalDate.getMonth() + 1)
        break
      case SubscriptionType.WEEKLY:
        renewalDate.setDate(renewalDate.getDate() + 7)
        break
    }

    if (this.subscriptionType === SubscriptionType.MONTHLY) {
      const lastDayOfMonth = new Date(
        renewalDate.getFullYear(),
        renewalDate.getMonth() + 1,
        0,
      )
      if (renewalDate.getDate() > lastDayOfMonth.getDate()) {
        renewalDate.setDate(lastDayOfMonth.getDate())
      }
    }

    return renewalDate
  }
}
