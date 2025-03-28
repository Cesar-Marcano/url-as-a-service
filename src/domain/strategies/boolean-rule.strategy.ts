import { SubscriptionRuleStrategy } from "../interfaces/subscription-rule.interface";

export class BooleanRuleStrategy implements SubscriptionRuleStrategy<boolean> {
  parse(value: string): boolean {
    return value === 'true'
  }
}
