import jwt from 'jsonwebtoken'
import { JwtPayload } from '../../domain/interfaces/jwt-payload.interface'
import { TokenType } from '../../domain/enums/token-type.enum'
import ms from 'ms'

export interface IJwtService {
  sign(payload: JwtPayload, expiresIn: number | ms.StringValue): string
  verify(token: string, type: TokenType): JwtPayload
}

export class JwtService implements IJwtService {
  constructor(
    private readonly accessSecret: string,
    private readonly refreshSecret: string,
  ) {}

  sign(payload: JwtPayload, expiresIn: number | ms.StringValue): string {
    const secret =
      payload.type === TokenType.ACCESS ? this.accessSecret : this.refreshSecret

    return jwt.sign(payload, secret, { expiresIn })
  }

  verify(token: string, type: TokenType): JwtPayload {
    const secret =
      type === TokenType.ACCESS ? this.accessSecret : this.refreshSecret

    return jwt.verify(token, secret) as unknown as JwtPayload
  }
}
