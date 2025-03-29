import { CurrencyEntity } from './currency.entity'
import {
  SubscriptionRule,
  SubscriptionRuleEntity,
} from './subscription-rule.entity'

export class SubscriptionEntity {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly currency: CurrencyEntity | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly rules: SubscriptionRuleEntity<SubscriptionRule>[] | null,
  ) {}

  public getRule<T extends SubscriptionRule>(
    ruleKey: T,
  ): SubscriptionRuleEntity<T> | undefined {
    return this.rules?.find(
      (r) => r.rule === ruleKey,
    ) as SubscriptionRuleEntity<T>
  }
}
