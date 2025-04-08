import { Router } from 'express'
import { CreateUserController } from '../../controllers/createUser.controller'
import { CreateUserUseCase } from '../../../application/use-cases/create-user/create-user.use-case'
import { UserRepository } from '../../repositories/user.repository'
import { db } from '../../database/database.instance'
import { RetrieveUserUseCase } from '../../../application/use-cases/retrieve-user/retrieve-user.use-case'
import { ReteiveUserController } from '../../controllers/reteiveUser.controller'
import { RetrieveUserByIdStrategy } from '../../../application/use-cases/retrieve-user/strategies/by-id.strategy'
import { RetrieveUserByUsernameStrategy } from '../../../application/use-cases/retrieve-user/strategies/by-username.strategy'
import { LoginUserUseCase } from '../../../application/use-cases/login-user/login-user.use-case'
import { LoginUserController } from '../../controllers/loginUser.controller'

export const router = Router()
export const name = 'auth'

const userRepository = new UserRepository(db)

const createUserUseCase = new CreateUserUseCase(userRepository)
const loginUserUseCase = new LoginUserUseCase(userRepository)
const retrieveUserUseCase = new RetrieveUserUseCase([
  new RetrieveUserByIdStrategy(userRepository),
  new RetrieveUserByUsernameStrategy(userRepository),
])

const createUserController = new CreateUserController(createUserUseCase)
const loginUserController = new LoginUserController(loginUserUseCase)
const retrieveUserController = new ReteiveUserController(retrieveUserUseCase)

router.post('/signup', async (req, res, next) => {
  await createUserController.handle(req as any, res, next)
})

router.post('/login', async (req, res, next) => {
  await loginUserController.handle(req as any, res, next)
})

router.get('/getUser', async (req, res, next) => {
  await retrieveUserController.handle(req as any, res, next)
})
