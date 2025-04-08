import { NextFunction } from 'express'
import { UserDTO } from '../../application/dtos/user.dto'
import { CreateUserUseCase } from '../../application/use-cases/create-user/create-user.use-case'
import { UserType } from '../../domain/entities/user.entity'
import {
  HydratedRequest,
  Controller,
  HydratedResponse,
} from '../../shared/interfaces/controller.interface'
import { RefreshTokenUseCase } from '../../application/use-cases/refresh-token/refresh-token.use-case'
import { LoginResponse } from './loginUser.controller'

export interface CreateUserDto {
  email: string
  password: string
}

export class CreateUserController
  implements Controller<unknown, CreateUserDto, unknown, unknown, LoginResponse>
{
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  async handle(
    req: HydratedRequest<unknown, CreateUserDto, unknown, unknown>,
    res: HydratedResponse<LoginResponse>,
    next: NextFunction,
  ): Promise<LoginResponse | void> {
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
      return { refreshToken }
    } catch (error) {
      next(error)
    }
  }
}
