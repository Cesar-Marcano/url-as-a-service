export enum SubscriptionSetting {
  MAX_URLS = 'max_urls',
  EXPIRATION_DAYS = 'expiration_days',
}

export type SubscriptionSettingValues = {
  [SubscriptionSetting.MAX_URLS]: number
  [SubscriptionSetting.EXPIRATION_DAYS]: Date
}

export class SubscriptionSettingEntity<T extends SubscriptionSetting> {
  constructor(
    public id: number,
    public permission: T,
    public value: SubscriptionSettingValues[T],
    public description: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
