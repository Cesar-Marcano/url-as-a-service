import { UserType } from '@domain/entities/user.entity'
import { JwtPayload } from '@domain/interfaces/jwt-payload.interface'
import { UnauthorizedErrorException } from '@shared/errors/unauthorized.error'
import { HydratedRequest } from '@shared/interfaces/controller.interface'
import { Request, Response, NextFunction } from 'express'

export const roleVerifier = (acceptedRoles: UserType[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const user = (req as HydratedRequest<JwtPayload>).user

    if (user.role in acceptedRoles) {
      next()
    }

    throw new UnauthorizedErrorException(
      "You don't have enough permissions to access this resource.",
    )
  }
}
