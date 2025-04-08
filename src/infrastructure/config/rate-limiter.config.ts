import rateLimit from 'express-rate-limit'
import { cache } from '../cache/redis.instance'
import RedisStore, { RedisReply } from 'rate-limit-redis'
import { logger } from '../../shared/utils/logger'

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  store: new RedisStore({
    sendCommand: async (
      command: string,
      ...args: (string | number | Buffer)[]
    ) => {
      try {
        return (await cache.call(command, ...args)) as Promise<RedisReply>
      } catch (error) {
        logger.error('Redis command failed:', error)
        throw error
      }
    },
  }),
})
