import { Router } from 'express'
import { CreateUserController } from '@infra/controllers/createUser.controller'
import { CreateUserUseCase } from '@app/use-cases/user/create-user/create-user.use-case' 
import { UserRepository } from '@infra/repositories/user.repository'
import { db } from '@infra/database/database.instance'
import { RetrieveUserUseCase } from '@app/use-cases/user/retrieve-user/retrieve-user.use-case' 
import { RetrieveUserController } from '@infra/controllers/retrieveUser.controller'
import { RetrieveUserByIdStrategy } from '@app/use-cases/user/retrieve-user/strategies/by-id.strategy'
import { RetrieveUserByUsernameStrategy } from '@app/use-cases/user/retrieve-user/strategies/by-username.strategy'
import { LoginUserUseCase } from '@app/use-cases/user/login-user/login-user.use-case' 
import { LoginUserController } from '@infra/controllers/loginUser.controller'
import { CacheService } from '@infra/services/cache.service' 
import { cache } from '@infra/cache/redis.instance'
import { RefreshTokenUseCase } from '@app/use-cases/user/refresh-token/refresh-token.use-case' 
import { JwtService } from '@infra/services/token.service' 
import { ConfigService } from '@infra/config/main.config' 
import { AccessTokenUseCase } from '@app/use-cases/user/access-token/access-token.use-case'
import { AccessTokenController } from '@infra/controllers/accessToken.controller' 
import { jwtRefreshMiddleware } from '@shared/middlewares/auth.middleware' 

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
router.post('/signup', async (req, res, next) => {
  await createUserController.handle(req as any, res, next)
})

router.post('/login', async (req, res, next) => {
  await loginUserController.handle(req as any, res, next)
})

router.get('/getUser', async (req, res, next) => {
  await retrieveUserController.handle(req as any, res, next)
})

router.post('/access-token', jwtRefreshMiddleware, async (req, res, next) => {
  await accessTokenController.handle(req as any, res, next)
})
