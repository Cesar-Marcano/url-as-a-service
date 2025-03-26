import { MaxUrlsExceededError } from '@domain/errors/maxUrlsExceeded.error'
import { SubscriptionSetting } from './subscription-settings.entity'
import { SubscriptionEntity } from './subscription.entity'
import { UrlEntity } from './url.entity'

export class UserEntity {
  constructor(
    public id: number,
    public email: string,
    public username: string,
    public password: string,
    public createdAt: Date,
    public updatedAt: Date,
    public urls: UrlEntity[],
    public subscription: SubscriptionEntity,
  ) {}

  canCreateUrl(): boolean {
    const maxUrls = this.subscription.getSettingValue(
      SubscriptionSetting.MAX_URLS,
    )
    if (maxUrls === undefined) {
      throw new Error('Subscription setting for MAX_URLS not found.')
    }

    if (typeof maxUrls !== 'number' || isNaN(maxUrls)) {
      throw new Error('Invalid type for maxUrls. Expected a valid number.')
    }

    return this.urls.length < maxUrls
  }

  addUrl(url: UrlEntity): void {
    if (!this.canCreateUrl()) {
      throw new MaxUrlsExceededError()
    }
    this.urls.push(url)
  }
}
