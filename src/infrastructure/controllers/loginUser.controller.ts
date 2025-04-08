import { NextFunction } from 'express'
import { UserDTO } from '../../application/dtos/user.dto'
import { LoginUserUseCase } from '../../application/use-cases/login-user/login-user.use-case'
import { HydratedRequest, Controller, HydratedResponse } from '../../shared/interfaces/controller.interface'

export interface LoginUserDto {
  email: string
  password: string
}

export class LoginUserController
  implements Controller<unknown, LoginUserDto, unknown, unknown, UserDTO>
{
  constructor(private readonly loginUserUseCase: LoginUserUseCase) {}

  async handle(
    req: HydratedRequest<unknown, LoginUserDto, unknown, unknown>,
    res: HydratedResponse<UserDTO>,
    next: NextFunction,
  ): Promise<UserDTO | void> {
    try {
      const { email, password } = req.body
      const user = await this.loginUserUseCase.execute({
        email,
        password,
      })
      res.status(200).json(user)
      return user
    } catch (error) {
      next(error)
    }
  }
}
