import { NextFunction } from 'express'
import { UserDTO } from '../../application/dtos/user.dto'
import { LoginUserUseCase } from '../../application/use-cases/login-user/login-user.use-case'
import {
  HydratedRequest,
  Controller,
  HydratedResponse,
} from '../../shared/interfaces/controller.interface'
import { RefreshTokenUseCase } from '../../application/use-cases/refresh-token/refresh-token.use-case'
import { UserType } from '../../domain/entities/user.entity'

export interface LoginUserDto {
  email: string
  password: string
}

export interface LoginResponse {
  refreshToken: string
}

export class LoginUserController
  implements Controller<unknown, LoginUserDto, unknown, unknown, LoginResponse>
{
  constructor(
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  async handle(
    req: HydratedRequest<unknown, LoginUserDto, unknown, unknown>,
    res: HydratedResponse<LoginResponse>,
    next: NextFunction,
  ): Promise<LoginResponse | void> {
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

      return { refreshToken }
    } catch (error) {
      next(error)
    }
  }
}
