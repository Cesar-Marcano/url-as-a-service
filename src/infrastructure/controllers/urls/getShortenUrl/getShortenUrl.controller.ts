import { Controller } from '@shared/interfaces/controller.interface'
import { GetShortenUrlContext } from './getShortenUrl.context'
import { RetrieveUrlUseCase } from '@app/use-cases/url/retrieve-url/retrieve-url.use-case'
import { RegisterClickUseCase } from '@app/use-cases/url-history/register-click/register-click.use-case'

export class GetShortenUrlController
  implements Controller<GetShortenUrlContext>
{
  constructor(
    private readonly retrieveUrlCase: RetrieveUrlUseCase,
    private readonly registerClickUseCase: RegisterClickUseCase,
  ) {}

  async handle({ req, res, next }: GetShortenUrlContext): Promise<void> {
    try {
      const data = await this.retrieveUrlCase.execute({
        slug: req.params.url,
      })

      const clientIp = req.headers['x-real-ip'] as string | undefined

      this.registerClickUseCase.execute({
        ipAddress: (clientIp ?? req.ip) as string,
        urlId: data.id,
        userAgent: req.headers['user-agent'] as string,
      })

      res.status(301).redirect(data.originalUrl)
    } catch (error) {
      next(error)
    }
  }
}
