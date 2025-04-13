import { SubscriptionRuleStrategy } from '@domain/interfaces/subscription-rule.interface'
import { NumberRuleStrategy } from '../strategies/number-rule.strategy'
import { SubscriptionEntity } from './subscription.entity'
import { Relation } from '@domain/value-objects/relation.value-object'

export enum SubscriptionRule {
  MAX_URLS = 'max_urls',
  MAX_REQUESTS = 'max_requests',
  MAX_REQUESTS_PER_HOUR = 'max_requests_per_hour',
}

const subscriptionRuleParsers: Record<
  SubscriptionRule,
  SubscriptionRuleStrategy<any>
> = {
  [SubscriptionRule.MAX_URLS]: new NumberRuleStrategy(),
  [SubscriptionRule.MAX_REQUESTS]: new NumberRuleStrategy(),
  [SubscriptionRule.MAX_REQUESTS_PER_HOUR]: new NumberRuleStrategy(),
}

export class SubscriptionRuleEntity<T extends SubscriptionRule> {
  public readonly parsedValue: ReturnType<SubscriptionRuleStrategy<T>['parse']>

  constructor(
    public readonly id: number,
    public readonly subscription: Relation<SubscriptionEntity> | null,
    public readonly rule: T,
    public readonly value: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {
    const parser = subscriptionRuleParsers[rule]
    if (!parser) {
      throw new Error(`No parser found for rule: ${rule}`)
    }
    this.parsedValue = parser.parse(value)
  }
}
