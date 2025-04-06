import { type Request, type Response } from 'express'

export type AuthenticatedRequest<
  User = unknown,
  Body = unknown,
  Params = Record<string, string>,
  Query = Record<string, string | undefined>
> = Request<Params, any, Body, Query> & {
  user: User
}

export type TypedResponse<DTO = unknown> = Response<DTO>

export interface Controller<
  User = unknown,
  Body = unknown,
  Params = Record<string, string>,
  Query = Record<string, string | undefined>,
  DTO = unknown
> {
  handle: (
    req: AuthenticatedRequest<User, Body, Params, Query>,
    res: TypedResponse<DTO>
  ) => Promise<DTO>
}
