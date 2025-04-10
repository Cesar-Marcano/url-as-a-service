import { SubscriptionRuleStrategy } from "@domain/interfaces/subscription-rule.interface";

export class NumberRuleStrategy implements SubscriptionRuleStrategy<number> {
  parse(value: string): number {
    return parseInt(value, 10)
  }
}
