import { UserDTO } from '@app/dtos/user.dto'
import { Controller } from '@shared/interfaces/controller.interface'
import { RetrieveUserUseCase } from '@app/use-cases/user/retrieve-user/retrieve-user.use-case'
import { CacheService } from '@infra/services/cache.service'
import { RetrieveUserContext } from './retrieveUser.context'

export class RetrieveUserController implements Controller<RetrieveUserContext> {
  constructor(
    private readonly retrieveUserUseCase: RetrieveUserUseCase,
    private readonly cacheService: CacheService,
  ) {}

  async handle({ req, res, next }: RetrieveUserContext): Promise<void> {
    try {
      const queryParams = req.query

      const cacheKey = `user:${JSON.stringify(queryParams)}`

      const cachedUser = await this.cacheService.get<UserDTO>(cacheKey)

      if (cachedUser) {
        res.setHeader('X-Cache', 'HIT')
        res.status(200).json(cachedUser)
        return
      }

      const user = await this.retrieveUserUseCase.execute(queryParams)

      this.cacheService.save(cacheKey, user)

      res.setHeader('X-Cache', 'MISS')
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }
}
