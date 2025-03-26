import {
  SubscriptionSetting,
  SubscriptionSettingEntity,
  SubscriptionSettingValues,
} from './subscription-settings.entity'

export class SubscriptionEntity {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: number,
    public currency: string,
    public createdAt: Date,
    public updatedAt: Date,
    public subscriptionSettings: SubscriptionSettingEntity<SubscriptionSetting>[],
  ) {}

  getSettingValue(
    permission: SubscriptionSetting,
  ): SubscriptionSettingValues[SubscriptionSetting] | undefined {
    const setting = this.subscriptionSettings.find(
      (s) => s.permission === permission,
    )
    return setting ? setting.value : undefined
  }
}
