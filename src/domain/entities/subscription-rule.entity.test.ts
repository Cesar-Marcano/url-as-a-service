import { SubscriptionRuleEntity } from './subscription-rule.entity';
import { SubscriptionRule } from './subscription-rule.entity';
import { SubscriptionEntity } from './subscription.entity';

describe('SubscriptionRuleEntity', () => {
  let subscription: SubscriptionEntity;

  beforeEach(() => {
    subscription = {} as SubscriptionEntity;
  });

  describe('constructor', () => {
    it('should correctly parse the value for MAX_URLS rule', () => {
      const subscriptionRuleEntity = new SubscriptionRuleEntity(
        1,
        subscription,
        SubscriptionRule.MAX_URLS,
        '100',
        new Date(),
        new Date()
      );

      expect(subscriptionRuleEntity.parsedValue).toBe(100);
    });

    it('should correctly parse the value for MAX_REQUESTS rule', () => {
      const subscriptionRuleEntity = new SubscriptionRuleEntity(
        2,
        subscription,
        SubscriptionRule.MAX_REQUESTS,
        '200',
        new Date(),
        new Date()
      );

      expect(subscriptionRuleEntity.parsedValue).toBe(200);
    });

    it('should throw an error if no parser is found for the rule', () => {
      const invalidRule = 'INVALID_RULE' as unknown as SubscriptionRule;

      expect(() => {
        new SubscriptionRuleEntity(3, subscription, invalidRule, '100', new Date(), new Date());
      }).toThrow('No parser found for rule: INVALID_RULE');
    });
  });
});
