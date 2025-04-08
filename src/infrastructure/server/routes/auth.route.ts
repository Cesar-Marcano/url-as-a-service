import { Router } from 'express'
import { CreateUserController } from '../../controllers/createUser.controller'
import { CreateUserUseCase } from '../../../application/use-cases/create-user/create-user.use-case'
import { UserRepository } from '../../repositories/user.repository'
import { db } from '../../database/database.instance'
import { RetrieveUserUseCase } from '../../../application/use-cases/retrieve-user/retrieve-user.use-case'
import { RetrieveUserController } from '../../controllers/retrieveUser.controller'
import { RetrieveUserByIdStrategy } from '../../../application/use-cases/retrieve-user/strategies/by-id.strategy'
import { RetrieveUserByUsernameStrategy } from '../../../application/use-cases/retrieve-user/strategies/by-username.strategy'
import { LoginUserUseCase } from '../../../application/use-cases/login-user/login-user.use-case'
import { LoginUserController } from '../../controllers/loginUser.controller'
import { CacheService } from '../../services/cache.service'
import { cache } from '../../cache/redis.instance'
import { RefreshTokenUseCase } from '../../../application/use-cases/refresh-token/refresh-token.use-case'
import { JwtService } from '../../services/token.service'
import { ConfigService } from '../../config/main.config'

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
