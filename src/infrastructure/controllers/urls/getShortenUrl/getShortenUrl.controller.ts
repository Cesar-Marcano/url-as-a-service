import { Controller } from '@shared/interfaces/controller.interface'
import { GetShortenUrlContext } from './getShortenUrl.context'
import { RetrieveUrlUseCase } from '@app/use-cases/url/retrieve-url/retrieve-url.use-case'
import { RegisterClickUseCase } from '@app/use-cases/url-history/register-click/register-click.use-case'
import { GeolocalizationUseCase } from '@app/use-cases/common/geolocalization/geolocalization.use-case'
import { logger } from '@shared/utils/logger'
import { CacheService } from '@infra/services/cache.service'

export class GetShortenUrlController
  implements Controller<GetShortenUrlContext>
{
  constructor(
    private readonly retrieveUrlCase: RetrieveUrlUseCase,
    private readonly registerClickUseCase: RegisterClickUseCase,
    private readonly geolocalizationUseCase: GeolocalizationUseCase,
    private readonly cacheService: CacheService,
  ) {}

  async handle({ req, res, next }: GetShortenUrlContext): Promise<void> {
    try {
      const slug = req.params.url

      const cached = await this.cacheService.get<{ data: string }>(slug)

      if (cached) {
        res.setHeader('X-Cache', 'HIT')
        res.status(301).redirect(cached.data)
      }

      const data = await this.retrieveUrlCase.execute({
        slug,
      })

      const clientIp = req.headers['x-real-ip'] as string | undefined
      const ipAddress = (clientIp ?? req.ip) as string

      ;(async () => {
        try {
          const geoData = await this.geolocalizationUseCase.execute({
            ipAddress,
          })

          await this.registerClickUseCase.execute({
            ipAddress: ipAddress,
            urlId: data.id,
            userAgent: req.headers['user-agent'] as string,
            country: geoData.country,
            city: geoData.city,
          })
        } catch (error) {
          logger.error(
            'Error while geolocalizing or while registering the click data',
            error,
          )
        }
      })()

      this.cacheService.save(slug, { data: data.originalUrl }, 3600)

      res.setHeader('X-Cache', 'MISS')

      res.status(301).redirect(data.originalUrl)
    } catch (error) {
      next(error)
    }
  }
}
