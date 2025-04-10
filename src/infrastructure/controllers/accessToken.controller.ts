import { NextFunction } from 'express'
import {
  HydratedRequest,
  Controller,
  HydratedResponse,
} from '@shared/interfaces/controller.interface'
import { AccessTokenUseCase } from '@app/use-cases/user/access-token/access-token.use-case' 

export interface AccessTokenDto {
  refreshToken: string
}

export interface AccessTokenResponse {
  accessToken: string
}

export class AccessTokenController
  implements
    Controller<unknown, AccessTokenDto, unknown, unknown, AccessTokenResponse>
{
  constructor(private readonly accessTokenUseCase: AccessTokenUseCase) {}

  async handle(
    req: HydratedRequest<unknown, AccessTokenDto, unknown, unknown>,
    res: HydratedResponse<AccessTokenResponse>,
    next: NextFunction,
  ): Promise<AccessTokenResponse | void> {
    try {
      const { refreshToken } = req.body
      const accessToken = await this.accessTokenUseCase.execute({
        refreshToken,
      })

      res.status(200).json({
        accessToken,
      })

      return { accessToken }
    } catch (error) {
      next(error)
    }
  }
}
