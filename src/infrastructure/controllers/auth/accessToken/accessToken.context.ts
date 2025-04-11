import { HydratedContext } from '@shared/interfaces/controller.interface'

export interface AccessTokenDto {
  refreshToken: string
}

export interface AccessTokenResponse {
  accessToken: string
}

export type AccessTokenContext = HydratedContext<
  unknown, // User (currently not logged-in)
  AccessTokenDto, // Body
  Record<string, string>,
  Record<string, string | undefined>,
  AccessTokenResponse // DTO (response)
>
