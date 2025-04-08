import passport from 'passport'
import { createAccessTokenStrategy } from '../strategies/jwt.strategy'
import { ConfigService } from './main.config'
import { createRefreshTokenStrategy } from '../strategies/refresh.strategy'

const configService = new ConfigService()

passport.use(
  'jwt',
  createAccessTokenStrategy(configService.getJwtAccessSecret()),
)
passport.use(
  'jwt-refresh',
  createRefreshTokenStrategy(configService.getJwtRefreshSecret()),
)

export { passport }
