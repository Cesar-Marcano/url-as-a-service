import { Router } from 'express'
import { CreateUserController } from '../../controllers/createUser.controller'
import { CreateUserUseCase } from '../../../application/use-cases/create-user.use-case'
import { UserRepository } from '../../repositories/user.repository'
import { db } from '../../database/database.instance'

export const router = Router()
export const name = 'auth'

const userRepository = new UserRepository(db)
const createUserUseCase = new CreateUserUseCase(userRepository)
const createUserController = new CreateUserController(createUserUseCase)

router.post('/signup', async (req, res, next) => {
  console.log('AAA')
  await createUserController.handle(req as any, res, next)
})
