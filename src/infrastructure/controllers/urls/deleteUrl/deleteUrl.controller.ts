import { Controller } from '@shared/interfaces/controller.interface'
import { DeleteUrlContext } from './deleteUrl.context'
import { DeleteUrlUseCase } from '@app/use-cases/url/delete-url/delete-url.use-case'
import { RetrieveUserUseCase } from '@app/use-cases/user/retrieve-user/retrieve-user.use-case'
import { UnauthorizedErrorException } from '@shared/errors/unauthorized.error'
import { UserType } from '@domain/entities/user.entity'

export class DeleteUrlController implements Controller<DeleteUrlContext> {
  constructor(
    private readonly deleteUrlUseCase: DeleteUrlUseCase,
    private readonly retrieveUserUseCase: RetrieveUserUseCase,
  ) {}

  async handle({ req, res, next }: DeleteUrlContext): Promise<void> {
    try {
      const user = req.user

      if (!user.sub) throw new UnauthorizedErrorException()

      const dbUser = await this.retrieveUserUseCase.execute({
        id: parseInt(user.sub),
      })

      await this.deleteUrlUseCase.execute({
        urlId: req.params.urlId,
        user: {
          id: dbUser.id,
          userType: dbUser.userType as UserType,
        },
      })

      res.status(204).send()
    } catch (error) {
      next(error)
    }
  }
}
