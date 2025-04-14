import { Controller } from '@shared/interfaces/controller.interface'
import { CreateUrlContext } from './createUrl.context'
import { CreateUrlUseCase } from '@app/use-cases/url/create-url/create-url.use-case'
import { UnauthorizedErrorException } from '@shared/errors/unauthorized.error'

export class CreateUrlController implements Controller<CreateUrlContext> {
  constructor(private readonly createUrlUseCase: CreateUrlUseCase) {}

  async handle({ req, res, next }: CreateUrlContext): Promise<void> {
    try {
      const user = req.user

      if (!user.sub) throw new UnauthorizedErrorException()

      const data = await this.createUrlUseCase.execute({
        authorId: parseInt(user.sub),
        originalUrl: req.body.originalUrl,
        slug: req.body.slug,
        ...(req.body.expirationDate
          ? { expirationDate: req.body.expirationDate }
          : {}),
      })

      res.status(201).json(data)
    } catch (error) {
      next(error)
    }
  }
}
