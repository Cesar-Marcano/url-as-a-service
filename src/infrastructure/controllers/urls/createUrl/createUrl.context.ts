import { UrlDTO } from '@app/dtos/url.dto'
import { CreateUrlInput } from '@app/use-cases/url/create-url/create-url.input'
import { HydratedContext } from '@shared/interfaces/controller.interface'
import { JwtPayload } from 'jsonwebtoken'

export interface CreateUrlDto extends CreateUrlInput {}

export type CreateUrlContext = HydratedContext<
  JwtPayload, // User
  CreateUrlDto, // Body
  Record<string, string>, // Params
  Record<string, string | undefined>, // Query
  UrlDTO // DTO (response)
>
