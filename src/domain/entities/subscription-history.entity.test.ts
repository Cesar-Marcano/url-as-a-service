import { SubscriptionHistoryEntity, SubscriptionType } from './subscription-history.entity';
import { UserEntity } from './user.entity';
import { SubscriptionEntity } from './subscription.entity';

describe('SubscriptionHistoryEntity', () => {
  let user: UserEntity;
  let subscription: SubscriptionEntity;
  let subscriptionHistory: SubscriptionHistoryEntity;

  beforeEach(() => {
    user = {} as UserEntity;

    subscription = {} as SubscriptionEntity;

    subscriptionHistory = new SubscriptionHistoryEntity(
      1,
      user,
      subscription,
      SubscriptionType.MONTHLY,
      new Date('2025-01-01'),
      null,
      new Date(),
      new Date(),
    );
  });

  it('should correctly calculate renewal date for monthly subscription', () => {
    const renewalDate = subscriptionHistory.getRenewalDate();
    const expectedDate = new Date('2025-02-01');
    
    expect(renewalDate.getFullYear()).toBe(expectedDate.getFullYear());
    expect(renewalDate.getMonth()).toBe(expectedDate.getMonth());
    expect(renewalDate.getDate()).toBe(expectedDate.getDate());
  });

  it('should return false if subscription is canceled', () => {
    const canceledSubscriptionHistory = new SubscriptionHistoryEntity(
      2,
      user,
      subscription,
      SubscriptionType.ANUAL,
      new Date('2024-01-01'),
      new Date('2024-06-01'),
      new Date(),
      new Date(),
    );

    expect(canceledSubscriptionHistory.isActive()).toBe(false);
  });

  it('should return true if subscription is active', () => {
    const activeSubscriptionHistory = new SubscriptionHistoryEntity(
      3,
      user,
      subscription,
      SubscriptionType.WEEKLY,
      new Date('2025-01-01'),
      null,
      new Date(),
      new Date(),
    );

    expect(activeSubscriptionHistory.isActive(new Date('2025-01-06'))).toBe(true);
  });

  it('should correctly check if subscription is active based on date', () => {
    const activeSubscriptionHistory = new SubscriptionHistoryEntity(
      4,
      user,
      subscription,
      SubscriptionType.MONTHLY,
      new Date('2025-01-01'),
      null,
      new Date(),
      new Date(),
    );

    const currentDate = new Date('2025-01-15');
    expect(activeSubscriptionHistory.isActive(currentDate)).toBe(true);
  });

  it('should return correct renewal date for weekly subscription', () => {
    const weeklySubscriptionHistory = new SubscriptionHistoryEntity(
      5,
      user,
      subscription,
      SubscriptionType.WEEKLY,
      new Date('2025-01-01'),
      null,
      new Date(),
      new Date(),
    );

    const renewalDate = weeklySubscriptionHistory.getRenewalDate();
    const expectedDate = new Date('2025-01-08');

    expect(renewalDate.getDate()).toBe(expectedDate.getDate());
    expect(renewalDate.getMonth()).toBe(expectedDate.getMonth());
    expect(renewalDate.getFullYear()).toBe(expectedDate.getFullYear());
  });
});
