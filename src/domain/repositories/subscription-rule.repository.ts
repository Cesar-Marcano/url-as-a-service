import {
  SubscriptionRule,
  SubscriptionRuleEntity,
} from '@domain/entities/subscription-rule.entity'

export interface ISubscriptionRuleRepository {
  findById(id: number): Promise<SubscriptionRuleEntity<SubscriptionRule> | null>

  findBySubscriptionId(
    subscriptionId: number,
  ): Promise<SubscriptionRuleEntity<SubscriptionRule>[]>

  findBySubscriptionIdAndRule(
    subscriptionId: number,
    rule: SubscriptionRule,
  ): Promise<SubscriptionRuleEntity<SubscriptionRule> | null>

  create(
    subscriptionId: number,
    rule: SubscriptionRule,
    value: string,
  ): Promise<SubscriptionRuleEntity<SubscriptionRule>>

  update(
    id: number,
    rule: SubscriptionRule,
    value: string,
  ): Promise<SubscriptionRuleEntity<SubscriptionRule>>

  delete(id: number): Promise<void>
}
