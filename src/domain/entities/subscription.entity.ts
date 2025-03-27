import { CurrencyEntity } from "./currency.entity";
import { SubscriptionRule, SubscriptionRuleEntity } from "./subscription-rules.entity";

export class SubscriptionEntity {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly currency: CurrencyEntity,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly rules: SubscriptionRuleEntity<SubscriptionRule>[],
  ) {}
}
