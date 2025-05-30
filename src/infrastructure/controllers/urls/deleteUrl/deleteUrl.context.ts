import { HydratedContext } from '@shared/interfaces/controller.interface'
import { JwtPayload } from 'jsonwebtoken'

export type DeleteUrlContext = HydratedContext<
  JwtPayload, // User
  unknown, // Body (no body)
  { urlId: number }, // Params
  Record<string, string | undefined>, // Query
  void // Response body (no response, just redirect)
>
