import { UrlDTO } from '@app/dtos/url.dto'
import { UrlEntity } from '@domain/entities/url.entity'
import { Relation } from '@domain/value-objects/relation.value-object'

export class UrlMapper {
  static toDto(url: UrlEntity): UrlDTO {
    return {
      id: url.id,
      slug: url.slug,
      originalUrl: url.originalUrl,
      expirationDate: url.expirationDate,
      authorId: url.author!.id,
      createdAt: url.createdAt,
      updatedAt: url.updatedAt,
    }
  }

  static fromDB(row: any): UrlEntity {
    return new UrlEntity(
      row.id,
      row.slug,
      row.original_url,
      row.created_at,
      row.updated_at,
      new Relation(row.author_id),
      row.expirationDate,
    )
  }
}
