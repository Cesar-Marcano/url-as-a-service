import { Redis } from 'ioredis'
import { ConfigService } from '../config/main.config'

class RedisCache {
  private static instance: Redis

  private constructor() {}

  static getInstance(): Redis {
    if (!RedisCache.instance) {
      const config = new ConfigService()

      RedisCache.instance = new Redis(config.getRedisUrl())
    }

    return RedisCache.instance
  }
}

export const cache = RedisCache.getInstance()
