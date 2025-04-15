import { UseCase } from '@app/interfaces/use-case.interface'
import { RegisterClickInput } from './register-click.input'
import { IUrlClickRepository } from '@domain/repositories/url-click.repository'
import { UrlClickEntity } from '@domain/entities/url-click.entity'
import { IUrlRepository } from '@domain/repositories/url.repository'
import {
  NotFoundErrorException,
  NotFoundErrorExceptionScope,
} from '@shared/errors/not-found.error'

export class RegisterClickUseCase
  implements UseCase<RegisterClickInput, boolean>
{
  constructor(
    private readonly urlRepository: IUrlRepository,
    private readonly urlClickRepository: IUrlClickRepository,
  ) {}

  async execute(input: RegisterClickInput): Promise<boolean> {
    const url = this.urlRepository.findById(input.urlId)

    if (!url)
      throw new NotFoundErrorException(
        NotFoundErrorExceptionScope.DATABASE,
        'urlId',
      )

    const urlClick = UrlClickEntity.create(
      input.urlId,
      input.ipAddress,
      input.userAgent,
      input.city,
      input.country,
    )

    await this.urlClickRepository.registerClick(urlClick)

    return true
  }
}
