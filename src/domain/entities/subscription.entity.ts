import { Relation } from '@domain/value-objects/relation.value-object'
import { CurrencyEntity } from './currency.entity'

export class SubscriptionEntity {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly currency: Relation<CurrencyEntity> | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
