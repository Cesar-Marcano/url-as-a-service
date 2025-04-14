import { HydratedContext } from '@shared/interfaces/controller.interface'

export type GetShortenUrlContext = HydratedContext<
  undefined, // User (not required to be logged)
  unknown, // Body (no body)
  Record<string, string>, // Params
  Record<string, string | undefined>, // Query
  void // Response body (no response, just redirect)
>
