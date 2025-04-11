import { HydratedContext } from '@shared/interfaces/controller.interface'
import { LoginResponse } from '../loginUser/loginUser.controller'

export interface CreateUserDto {
  email: string
  password: string
}

export type CreateUserContext = HydratedContext<
  unknown, // User (not logged in yet)
  CreateUserDto, // Body
  Record<string, string>, // Params
  Record<string, string | undefined>, // Query
  LoginResponse // DTO (response)
>
