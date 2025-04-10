import passport from 'passport'
import { createAccessTokenStrategy } from '@infra/strategies/jwt.strategy'
import { ConfigService } from './main.config'
import { createRefreshTokenStrategy } from '@infra/strategies/refresh.strategy'

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
