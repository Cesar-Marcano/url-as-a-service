import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { TokenType } from '@domain/enums/token-type.enum'
import { JwtPayload } from '@domain/interfaces/jwt-payload.interface'

export const createAccessTokenStrategy = (secret: string) =>
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    },
    (payload: JwtPayload, done: Function) => {
      if (payload.type !== TokenType.ACCESS) return done(null, false)
      return done(null, payload)
    },
  )
