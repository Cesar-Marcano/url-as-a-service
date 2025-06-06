import { Router } from 'express'
import { UserRepository } from '@infra/repositories/user.repository'
import { db } from '@infra/database/database.instance'
import { RetrieveUserUseCase } from '@app/use-cases/user/retrieve-user/retrieve-user.use-case'
import { RetrieveUserByIdStrategy } from '@app/use-cases/user/retrieve-user/strategies/by-id.strategy'
import { RetrieveUserByUsernameStrategy } from '@app/use-cases/user/retrieve-user/strategies/by-username.strategy'
import { jwtAuthMiddleware } from '@shared/middlewares/auth.middleware'
import { registerRoutes } from '@shared/utils/register-routes'
import { ProfileController } from '@infra/controllers/user/profile/profile.controller'
import { RetrieveUserController } from '@infra/controllers/auth/retrieveUser/retrieveUser.controller'
import { CacheService } from '@infra/services/cache.service'
import { cache } from '@infra/cache/redis.instance'

// Route settings
export const router = Router()
export const name = 'user' // route prefix

// Respositories
const userRepository = new UserRepository(db)

// External services
const cacheService = new CacheService(cache)

// Use cases
const retrieveUserUseCase = new RetrieveUserUseCase([
  new RetrieveUserByIdStrategy(userRepository),
  new RetrieveUserByUsernameStrategy(userRepository),
])

// Controllers
const profileController = new ProfileController(retrieveUserUseCase)
const retrieveUserController = new RetrieveUserController(
  retrieveUserUseCase,
  cacheService,
)

// Route definitions
registerRoutes(router, [
  {
    path: '/profile',
    controller: profileController,
    method: 'get',
    middlewares: [jwtAuthMiddleware],
  },
  {
    path: '/getUser',
    controller: retrieveUserController,
    method: 'get',
    middlewares: [jwtAuthMiddleware],
  },
])
