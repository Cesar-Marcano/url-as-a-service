import { SubscriptionEntity } from "../entities/subscription.entity"

export interface SubscriptionRepository {
  findById(id: number): Promise<SubscriptionEntity | null>
  findByName(name: string): Promise<SubscriptionEntity | null>
  create(subscription: SubscriptionEntity): Promise<SubscriptionEntity>
  update(subscription: Partial<SubscriptionEntity>): Promise<SubscriptionEntity>
  delete(id: number): Promise<void>
  getAll(): Promise<SubscriptionEntity[]>
  count(): Promise<number>
}
