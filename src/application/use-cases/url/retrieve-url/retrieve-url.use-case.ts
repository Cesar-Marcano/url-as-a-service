import { UseCase } from '@app/interfaces/use-case.interface'
import { RetrieveUrlInput } from './retrieve-url.input'
import { UrlDTO } from '@app/dtos/url.dto'
import { IUrlRepository } from '@domain/repositories/url.repository'
import {
  NotFoundErrorException,
  NotFoundErrorExceptionScope,
} from '@shared/errors/not-found.error'
import { UrlMapper } from '@app/mappers/url.mapper'
import { UrlExpiredException } from '@shared/errors/url-expired.error'

export class RetrieveUrlUseCase implements UseCase<RetrieveUrlInput, UrlDTO> {
  constructor(private readonly urlRepository: IUrlRepository) {}

  async execute(input: RetrieveUrlInput): Promise<UrlDTO> {
    const url = await this.urlRepository.findBySlug(input.slug)

    if (!url)
      throw new NotFoundErrorException(
        NotFoundErrorExceptionScope.DATABASE,
        'url',
      )

    if (url.expirationDate && url.expirationDate < new Date()) {
      throw new UrlExpiredException(input.slug)
    }

    return UrlMapper.toDto(url)
  }
}
