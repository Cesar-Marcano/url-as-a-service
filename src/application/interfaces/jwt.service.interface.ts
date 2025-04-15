import ms from 'ms'
import { TokenType } from '@domain/enums/token-type.enum'
import { JwtPayload } from '@domain/interfaces/jwt-payload.interface'

export interface IJwtService {
  sign(payload: JwtPayload, expiresIn: number | ms.StringValue): string
  verify(token: string, type: TokenType): JwtPayload
}
