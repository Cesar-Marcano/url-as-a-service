import { NextFunction } from 'express'
import { UserDTO } from '../../application/dtos/user.dto'
import { RetrieveUserInput } from '../../application/use-cases/retrieve-user/retrieve-user.input'
import {
  HydratedRequest,
  Controller,
  HydratedResponse,
} from '../../shared/interfaces/controller.interface'
import { RetrieveUserUseCase } from '../../application/use-cases/retrieve-user/retrieve-user.use-case'
import { CacheService } from '../services/cache.service'

export class RetrieveUserController
  implements Controller<unknown, unknown, unknown, RetrieveUserInput, UserDTO>
{
  constructor(
    private readonly retrieveUserUseCase: RetrieveUserUseCase,
    private readonly cacheService: CacheService,
  ) {}

  async handle(
    req: HydratedRequest<unknown, unknown, unknown, RetrieveUserInput>,
    res: HydratedResponse<UserDTO>,
    next: NextFunction,
  ): Promise<UserDTO | void> {
    try {
      const queryParams = req.query

      const cacheKey = `user:${JSON.stringify(queryParams)}`

      const cachedUser = await this.cacheService.get<UserDTO>(cacheKey)

      if (cachedUser) {
        res.status(200).json(cachedUser)
        return
      }

      const user = await this.retrieveUserUseCase.execute(queryParams)

      this.cacheService.save(cacheKey, user)

      res.status(200).json(user)
      return user
    } catch (error) {
      next(error)
    }
  }
}
