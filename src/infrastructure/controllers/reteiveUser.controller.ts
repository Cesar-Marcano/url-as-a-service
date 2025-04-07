import { NextFunction } from 'express'
import { UserDTO } from '../../application/dtos/user.dto'
import { RetrieveUserInput } from '../../application/use-cases/retrieve-user/retrieve-user.input'
import {
  AuthenticatedRequest,
  Controller,
  TypedResponse,
} from '../../shared/interfaces/controller.interface'
import { RetrieveUserUseCase } from '../../application/use-cases/retrieve-user/retrieve-user.use-case'

export class ReteiveUserController
  implements Controller<unknown, unknown, unknown, RetrieveUserInput, UserDTO>
{
  constructor(private readonly retrieveUserUseCase: RetrieveUserUseCase) {}

  async handle(
    req: AuthenticatedRequest<unknown, unknown, unknown, RetrieveUserInput>,
    res: TypedResponse<UserDTO>,
    next: NextFunction,
  ): Promise<UserDTO | void> {
    try {
      const queryParams = req.query

      const user = await this.retrieveUserUseCase.execute(queryParams)

      res.status(200).json(user)
      return user
    } catch (error) {
      next(error)
    }
  }
}
