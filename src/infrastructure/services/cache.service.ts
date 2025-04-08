import Redis from 'ioredis'

export class CacheService {
  constructor(private readonly cache: Redis) {}

  async save<T>(key: string, value: T, ttl: number = 3600): Promise<void> {
    const stringValue = JSON.stringify({ data: value })
    await this.cache.set(key, stringValue, 'EX', ttl)
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.cache.get(key)
    if (!value) return null

    const parsedValue = JSON.parse(value)
    return parsedValue.data as T
  }
}
