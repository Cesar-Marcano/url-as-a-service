import { NextFunction } from 'express'
import { UserDTO } from '../../application/dtos/user.dto'
import { CreateUserUseCase } from '../../application/use-cases/create-user/create-user.use-case'
import { UserType } from '../../domain/entities/user.entity'
import {
  HydratedRequest,
  Controller,
  HydratedResponse,
} from '../../shared/interfaces/controller.interface'

export interface CreateUserDto {
  email: string
  password: string
}

export class CreateUserController
  implements Controller<unknown, CreateUserDto, unknown, unknown, UserDTO>
{
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async handle(
    req: HydratedRequest<unknown, CreateUserDto, unknown, unknown>,
    res: HydratedResponse<UserDTO>,
    next: NextFunction
  ): Promise<UserDTO | void> {
    try {
      const { email, password } = req.body
      const user = await this.createUserUseCase.execute({
        email,
        password,
        userType: UserType.USER,
      })
      res.status(201).json(user)
      return user
    } catch (error) {
        next(error)
    }
  }
}
