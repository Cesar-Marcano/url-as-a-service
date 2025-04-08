import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { JwtPayload } from '../../domain/interfaces/jwt-payload.interface'
import { TokenType } from '../../domain/enums/token-type.enum'

export const createRefreshTokenStrategy = (secret: string) =>
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.body?.refreshToken,
      ]),
      secretOrKey: secret,
    },
    (payload: JwtPayload, done) => {
      if (payload.type !== TokenType.REFRESH) return done(null, false)
      return done(null, payload)
    },
  )
