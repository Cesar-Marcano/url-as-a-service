import { LoginUserUseCase } from '@app/use-cases/user/login-user/login-user.use-case'
import { Controller } from '@shared/interfaces/controller.interface'
import { RefreshTokenUseCase } from '@app/use-cases/user/refresh-token/refresh-token.use-case'
import { UserType } from '@domain/entities/user.entity'
import { LoginUserContext } from './loginUser.context'

export interface LoginUserDto {
  email: string
  password: string
}

export interface LoginResponse {
  refreshToken: string
}

export class LoginUserController implements Controller<LoginUserContext> {
  constructor(
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  async handle({ req, res, next }: LoginUserContext): Promise<void> {
    try {
      const { email, password } = req.body
      const user = await this.loginUserUseCase.execute({
        email,
        password,
      })

      const refreshToken = await this.refreshTokenUseCase.execute({
        userId: user.id,
        email: user.email,
        role: user.userType as UserType,
      })

      res.status(200).json({
        refreshToken,
      })
    } catch (error) {
      next(error)
    }
  }
}
