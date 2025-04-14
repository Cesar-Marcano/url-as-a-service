import { Controller } from '@shared/interfaces/controller.interface'
import { GetShortenUrlContext } from './getShortenUrl.context'
import { RetrieveUrlUseCase } from '@app/use-cases/url/retrieve-url/retrieve-url.use-case'

export class GetShortenUrlController implements Controller<GetShortenUrlContext> {
  constructor(private readonly retrieveUrlCase: RetrieveUrlUseCase) {}

  async handle({ req, res, next }: GetShortenUrlContext): Promise<void> {
    try {
      const data = await this.retrieveUrlCase.execute({
        slug: req.params.url,
      })

      res.status(301).redirect(data.originalUrl)
    } catch (error) {
      next(error)
    }
  }
}
