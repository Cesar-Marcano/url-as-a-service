export interface SubscriptionRuleStrategy<T> {
  parse(value: string): T
}
