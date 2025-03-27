export type SubscriptionRuleValue = string | number | boolean | Date;

export class SubscriptionRuleEntity {
  constructor(
    public readonly id: number,
    public readonly rule: string,
    public readonly value: SubscriptionRuleValue,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
