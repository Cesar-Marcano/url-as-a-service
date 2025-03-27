import { SubscriptionRuleStrategy } from '@domain/interfaces/subscription-rule.interface'

export class DateRuleStrategy implements SubscriptionRuleStrategy<Date> {
  parse(value: string): Date {
    return new Date(value)
  }
}
