import { UserType } from '../entities/user.entity'
import { TokenType } from '../enums/token-type.enum'

export interface JwtPayload {
  sub: number
  email: string
  role: UserType
  type: TokenType
}
