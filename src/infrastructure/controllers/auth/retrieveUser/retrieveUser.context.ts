import { HydratedContext } from '@shared/interfaces/controller.interface'
import { RetrieveUserInput } from '@app/use-cases/user/retrieve-user/retrieve-user.input'
import { UserDTO } from '@app/dtos/user.dto'

export type RetrieveUserContext = HydratedContext<
  unknown, // User (since the user may not be logged in yet)
  unknown, // Body (no body content here, because its a GET request)
  Record<string, string>, // Params
  RetrieveUserInput, // Query (the input that contains the query params)
  UserDTO // DTO (response - the user data)
>
