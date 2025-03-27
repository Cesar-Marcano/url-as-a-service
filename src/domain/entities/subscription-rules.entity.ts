import { SubscriptionEntity } from './subscription.entity'


export enum SubscriptionRule {
  MAX_URLS = 'max_urls',
  MAX_REQUESTS = 'max_requests',
  MAX_REQUESTS_PER_HOUR = 'max_requests_per_hour',
}

type SubscriptionRuleValuesMap = {
  [SubscriptionRule.MAX_URLS]: number;
  [SubscriptionRule.MAX_REQUESTS]: number;
  [SubscriptionRule.MAX_REQUESTS_PER_HOUR]: number;
};

export class SubscriptionRuleEntity<T extends SubscriptionRule> {
  constructor(
    public readonly id: number,
    public readonly subscription: SubscriptionEntity,
    public readonly rule: SubscriptionRule,
    public readonly value: SubscriptionRuleValuesMap[T],
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
