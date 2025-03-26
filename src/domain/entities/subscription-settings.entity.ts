export enum SubscriptionSettings {
  MAX_URLS = 'max_urls',
  MAX_URL_EXPIRATION_DAYS = 'max_url_expiration_days',
}

export type SubscriptionSettingValues = {
  [SubscriptionSettings.MAX_URLS]: number
  [SubscriptionSettings.MAX_URL_EXPIRATION_DAYS]: number
}

export class SubscriptionSettingsEntity<T extends SubscriptionSettings> {
  constructor(
    public readonly id: number,
    public readonly permission: T,
    public readonly value: SubscriptionSettingValues[T],
    public readonly description: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
