import { Relation } from '@domain/value-objects/relation.value-object'
import { UrlEntity } from './url.entity'

export class UrlClickEntity {
  constructor(
    public readonly id: number,
    public readonly url: Relation<UrlEntity> | null,
    public readonly clickTime: Date,
    public readonly fromIpAddress: string,
    public readonly fromUserAgent: string,
    public readonly fromCountry?: string,
    public readonly fromCity?: string,
  ) {}

  static create(
    urlId: number,
    fromIpAddress: string,
    fromUserAgent: string,
    fromCountry?: string,
    fromCity?: string,
  ): UrlClickEntity {
    return new UrlClickEntity(
      0,
      new Relation(urlId),
      new Date(),
      fromIpAddress,
      fromUserAgent,
      fromCountry,
      fromCity,
    )
  }
}
