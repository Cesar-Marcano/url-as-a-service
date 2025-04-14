import { Router } from 'express'
import { CreateUserController } from '@infra/controllers/auth/createUser/createUser.controller'
import { CreateUserUseCase } from '@app/use-cases/user/create-user/create-user.use-case'
import { UserRepository } from '@infra/repositories/user.repository'
import { db } from '@infra/database/database.instance'
import { RetrieveUserUseCase } from '@app/use-cases/user/retrieve-user/retrieve-user.use-case'
import { RetrieveUserController } from '@infra/controllers/auth/retrieveUser/retrieveUser.controller'
import { RetrieveUserByIdStrategy } from '@app/use-cases/user/retrieve-user/strategies/by-id.strategy'
import { RetrieveUserByUsernameStrategy } from '@app/use-cases/user/retrieve-user/strategies/by-username.strategy'
import { LoginUserUseCase } from '@app/use-cases/user/login-user/login-user.use-case'
import { LoginUserController } from '@infra/controllers/auth/loginUser/loginUser.controller'
import { CacheService } from '@infra/services/cache.service'
import { cache } from '@infra/cache/redis.instance'
import { RefreshTokenUseCase } from '@app/use-cases/user/refresh-token/refresh-token.use-case'
import { JwtService } from '@infra/services/token.service'
import { ConfigService } from '@infra/config/main.config'
import { AccessTokenUseCase } from '@app/use-cases/user/access-token/access-token.use-case'
import { AccessTokenController } from '@infra/controllers/auth/accessToken/accessToken.controller'
import { jwtAuthMiddleware, jwtRefreshMiddleware } from '@shared/middlewares/auth.middleware'
import { registerRoutes } from '@shared/utils/register-routes'

// Route settings
export const router = Router()
export const name = 'auth' // route prefix

// Respositories
const userRepository = new UserRepository(db)

// External services
const cacheService = new CacheService(cache)
const configService = new ConfigService()

const tokenService = new JwtService(
  configService.getJwtAccessSecret(),
  configService.getJwtRefreshSecret(),
)

// Use cases
const createUserUseCase = new CreateUserUseCase(userRepository)
const loginUserUseCase = new LoginUserUseCase(userRepository)
const retrieveUserUseCase = new RetrieveUserUseCase([
  new RetrieveUserByIdStrategy(userRepository),
  new RetrieveUserByUsernameStrategy(userRepository),
])
const refreshTokenUseCase = new RefreshTokenUseCase(
  tokenService,
  configService.getRefreshTokenDuration(),
)
const accessTokenUseCase = new AccessTokenUseCase(
  tokenService,
  configService.getAccessTokenDuration(),
)

// Controllers
const createUserController = new CreateUserController(
  createUserUseCase,
  refreshTokenUseCase,
)
const loginUserController = new LoginUserController(
  loginUserUseCase,
  refreshTokenUseCase,
)
const retrieveUserController = new RetrieveUserController(
  retrieveUserUseCase,
  cacheService,
)
const accessTokenController = new AccessTokenController(accessTokenUseCase)

// Route definitions
registerRoutes(router, [
  {
    path: '/signup',
    controller: createUserController,
    method: 'post',
  },
  {
    path: '/login',
    controller: loginUserController,
    method: 'post',
  },
  {
    path: '/getUser',
    controller: retrieveUserController,
    method: 'get',
    middlewares: [jwtAuthMiddleware],
  },
  {
    path: '/access-token',
    controller: accessTokenController,
    method: 'post',
    middlewares: [jwtRefreshMiddleware],
  },
])
