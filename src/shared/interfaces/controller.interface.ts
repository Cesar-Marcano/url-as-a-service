import { NextFunction, type Request, type Response } from 'express'
import { ErrorResponse } from './error.interface'

export type HydratedRequest<
  User = unknown,
  Body = unknown,
  Params = Record<string, string>,
  Query = Record<string, string | undefined>,
> = Request<Params, any, Body, Query> & {
  user: User
}

export type HydratedResponse<DTO = unknown> = Response<DTO | ErrorResponse>

export interface HydratedContext<
  User,
  Body,
  Params,
  Query,
  DTO
> {
  req: HydratedRequest<User, Body, Params, Query>
  res: HydratedResponse<DTO>
  next: NextFunction
}

export interface Controller<Ctx extends HydratedContext<any, any, any, any, any>> {
  handle: (ctx: Ctx) => Promise<void>
}
