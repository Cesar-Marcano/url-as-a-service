import { NextFunction } from 'express'
import { UserDTO } from '@app/dtos/user.dto' 
import { RetrieveUserInput } from '@app/use-cases/user/retrieve-user/retrieve-user.input'
import {
  HydratedRequest,
  Controller,
  HydratedResponse,
} from '@shared/interfaces/controller.interface'
import { RetrieveUserUseCase } from '@app/use-cases/user/retrieve-user/retrieve-user.use-case' 
import { CacheService } from '@infra/services/cache.service' 

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
        res.setHeader('X-Cache', 'HIT')
        res.status(200).json(cachedUser)
        return
      }
      
      const user = await this.retrieveUserUseCase.execute(queryParams)
      
      this.cacheService.save(cacheKey, user)
      
      res.setHeader('X-Cache', 'MISS')
      res.status(200).json(user)
      return user
    } catch (error) {
      next(error)
    }
  }
}
