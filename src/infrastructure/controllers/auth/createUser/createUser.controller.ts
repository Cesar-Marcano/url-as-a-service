import { CreateUserUseCase } from '@app/use-cases/user/create-user/create-user.use-case'
import { UserType } from '@domain/entities/user.entity'
import { Controller } from '@shared/interfaces/controller.interface'
import { RefreshTokenUseCase } from '@app/use-cases/user/refresh-token/refresh-token.use-case'
import { CreateUserContext } from './createUser.context'

export interface CreateUserDto {
  email: string
  password: string
}

export class CreateUserController implements Controller<CreateUserContext> {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  async handle({ req, res, next }: CreateUserContext): Promise<void> {
    try {
      const { email, password } = req.body
      const user = await this.createUserUseCase.execute({
        email,
        password,
        userType: UserType.USER,
      })

      const refreshToken = await this.refreshTokenUseCase.execute({
        userId: user.id,
        email: user.email,
        role: user.userType as UserType,
      })

      res.status(201).json({ refreshToken })
    } catch (error) {
      next(error)
    }
  }
}
