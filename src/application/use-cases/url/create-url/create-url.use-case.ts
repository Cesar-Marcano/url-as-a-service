import { UrlDTO } from '@app/dtos/url.dto'
import { UseCase } from '@app/interfaces/use-case.interface'
import { CreateUrlInput } from './create-url.input'
import { IUrlRepository } from '@domain/repositories/url.repository'
import { UrlEntity } from '@domain/entities/url.entity'
import { UrlMapper } from '@app/mappers/url.mapper'
import { DuplicateKeyError } from '@shared/errors/duplicate-key.error'

export class CreateUrlUseCase implements UseCase<CreateUrlInput, UrlDTO> {
  constructor(private readonly urlRepository: IUrlRepository) {}

  async execute(input: CreateUrlInput): Promise<UrlDTO> {
    const urlFromSlug = await this.urlRepository.findBySlug(input.slug)

    if (urlFromSlug) {
      throw new DuplicateKeyError('slug')
    }

    const url = UrlEntity.create(
      input.slug,
      input.originalUrl,
      input.authorId,
      input.expirationDate,
    )

    const newUrl = await this.urlRepository.create(url)

    return UrlMapper.toDto(newUrl)
  }
}
