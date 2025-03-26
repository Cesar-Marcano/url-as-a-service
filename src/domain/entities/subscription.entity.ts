import {
  SubscriptionSettings,
  SubscriptionSettingsEntity,
  SubscriptionSettingValues,
} from './subscription-settings.entity'

export class SubscriptionEntity {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly currency: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly subscriptionSettings: SubscriptionSettingsEntity<SubscriptionSettings>[],
  ) {}

  getSettingValue(
    permission: SubscriptionSettings,
  ): SubscriptionSettingValues[SubscriptionSettings] | undefined {
    const setting = this.subscriptionSettings.find(
      (s) => s.permission === permission,
    )
    return setting ? setting.value : undefined
  }
}
