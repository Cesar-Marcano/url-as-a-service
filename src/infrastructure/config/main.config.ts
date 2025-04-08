import ms from 'ms'
import { getEnv } from '../../shared/utils/getEnv'

type NodeEnv = 'development' | 'production' | 'test'

export class ConfigService {
  getDatabaseUrl(): string {
    return getEnv<string>('DATABASE_URL')
  }

  getPaypalClientId(): string {
    return getEnv<string>('PAYPAL_CLIENT_ID')
  }

  getPaypalClientSecret(): string {
    return getEnv<string>('PAYPAL_CLIENT_SECRET')
  }

  getJwtAccessSecret(): string {
    return getEnv<string>('JWT_ACCESS_SECRET')
  }

  getJwtRefreshSecret(): string {
    return getEnv<string>('JWT_REFRESH_SECRET')
  }

  getPort(): number {
    return getEnv<number>('PORT', 3000)
  }

  getRedisUrl(): string {
    return getEnv<string>('REDIS_URL')
  }

  getAccessTokenDuration(): ms.StringValue | number {
    return getEnv<ms.StringValue | number>('ACCESS_TOKEN_DURATION', '1h')
  }

  getRefreshTokenDuration(): ms.StringValue | number {
    return getEnv<ms.StringValue | number>('REFRESH_TOKEN_DURATION', '30d')
  }

  getNodeEnv(): NodeEnv {
    return getEnv<NodeEnv>('NODE_ENV', 'development')
  }

  isProduction(): boolean {
    return this.getNodeEnv() === 'production'
  }
}
