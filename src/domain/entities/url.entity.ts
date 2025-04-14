import { Relation } from '@domain/value-objects/relation.value-object'
import { UserEntity } from './user.entity'

export class UrlEntity {
  constructor(
    public readonly id: number,
    public readonly slug: string,
    public readonly originalUrl: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly author: Relation<UserEntity> | null,
    public readonly expirationDate: Date | null,
  ) {}

  static create(
    slug: string,
    originalUrl: string,
    authorId: number,
    expirationDate?: Date,
  ): UrlEntity {
    return new UrlEntity(
      0,
      slug,
      originalUrl,
      new Date(),
      new Date(),
      new Relation(authorId),
      expirationDate ?? null,
    )
  }
}
