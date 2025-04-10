import { UserType } from '@domain/entities/user.entity'
import { TokenType } from '@domain/enums/token-type.enum'

export interface JwtPayload {
  sub: number
  email: string
  role: UserType
  type: TokenType
}
