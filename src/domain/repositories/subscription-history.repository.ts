import { SubscriptionHistoryEntity } from '@domain/entities/subscription-history.entity'

export interface ISubscriptionHistoryRepository {
  getSubscriptionRecordById(
    id: number,
  ): Promise<SubscriptionHistoryEntity | null>

  getSubscriptionRecordsByUserId(
    userId: number,
  ): Promise<SubscriptionHistoryEntity[]>

  getSubscriptionRecordsByUserIdInRange(
    userId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<SubscriptionHistoryEntity[]>

  createSubscriptionRecord(
    subscriptionHistory: SubscriptionHistoryEntity,
  ): Promise<SubscriptionHistoryEntity>

  updateSubscriptionRecord(
    id: number,
    subscriptionHistory: Partial<SubscriptionHistoryEntity>,
  ): Promise<SubscriptionHistoryEntity | null>

  deleteSubscriptionRecord(id: number): Promise<boolean>
}
