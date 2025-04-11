import { HydratedContext } from '@shared/interfaces/controller.interface'

export interface LoginUserDto {
  email: string
  password: string
}

export interface LoginResponse {
  refreshToken: string
}

export type LoginUserContext = HydratedContext<
  unknown, // User (not logged in yet)
  LoginUserDto, // Body
  Record<string, string>, // Params
  Record<string, string | undefined>, // Query
  LoginResponse // DTO (response)
>
