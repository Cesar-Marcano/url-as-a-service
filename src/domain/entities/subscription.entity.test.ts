import { SubscriptionEntity } from './subscription.entity'
import {
  SubscriptionRule,
  SubscriptionRuleEntity,
} from './subscription-rule.entity'
import { CurrencyEntity } from './currency.entity'

describe('SubscriptionEntity', () => {
  let subscription: SubscriptionEntity
  let ruleMaxUrls: SubscriptionRuleEntity<SubscriptionRule.MAX_URLS>
  let ruleMaxRequests: SubscriptionRuleEntity<SubscriptionRule.MAX_REQUESTS>

  beforeEach(() => {
    const currency = new CurrencyEntity(1, 'USD', '$')

    ruleMaxUrls = new SubscriptionRuleEntity(
      1,
      subscription,
      SubscriptionRule.MAX_URLS,
      '100',
      new Date(),
      new Date(),
    )

    ruleMaxRequests = new SubscriptionRuleEntity(
      2,
      subscription,
      SubscriptionRule.MAX_REQUESTS,
      '200',
      new Date(),
      new Date(),
    )

    subscription = new SubscriptionEntity(
      1,
      'Premium Plan',
      'Access to premium features',
      99.99,
      currency,
      new Date(),
      new Date(),
      [ruleMaxUrls, ruleMaxRequests],
    )
  })

  it('should return the correct rule when calling getRule with a valid rule key', () => {
    const result = subscription.getRule(SubscriptionRule.MAX_URLS)

    expect(result).toBeDefined()
    expect(result?.rule).toBe(SubscriptionRule.MAX_URLS)
    expect(result?.parsedValue).toBe(100)
  })

  it('should return the correct rule when calling getRule with a valid rule key (MAX_REQUESTS)', () => {
    const result = subscription.getRule(SubscriptionRule.MAX_REQUESTS)

    expect(result).toBeDefined()
    expect(result?.rule).toBe(SubscriptionRule.MAX_REQUESTS)
    expect(result?.parsedValue).toBe(200)
  })

  it('should return undefined when calling getRule with a rule key that does not exist', () => {
    const result = subscription.getRule(SubscriptionRule.MAX_REQUESTS_PER_HOUR)

    expect(result).toBeUndefined()
  })
})
