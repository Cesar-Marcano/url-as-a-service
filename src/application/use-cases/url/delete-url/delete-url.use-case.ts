import { UseCase } from '@app/interfaces/use-case.interface'
import { DeleteUrlInput } from './delete-url.input'
import { IUrlRepository } from '@domain/repositories/url.repository'
import { UserType } from '@domain/entities/user.entity'
import { UnauthorizedErrorException } from '@shared/errors/unauthorized.error'
import {
  NotFoundErrorException,
  NotFoundErrorExceptionScope,
} from '@shared/errors/not-found.error'

export class DeleteUrlUseCase implements UseCase<DeleteUrlInput, boolean> {
  constructor(private readonly urlRepository: IUrlRepository) {}

  async execute(input: DeleteUrlInput): Promise<boolean> {
    const url = await this.urlRepository.findById(input.urlId)

    if (!url)
      throw new NotFoundErrorException(
        NotFoundErrorExceptionScope.DATABASE,
        'url',
      )

    const canBypassAuthorCheck =
      input.user.userType === UserType.ADMIN ||
      input.user.userType === UserType.MODERATOR

    if (url.author!.id !== input.user.id && !canBypassAuthorCheck) {
      throw new UnauthorizedErrorException(
        "You don't have enough permissions to delete an url that you don't own.",
      )
    }

    await this.urlRepository.delete(input.urlId)

    return true
  }
}
