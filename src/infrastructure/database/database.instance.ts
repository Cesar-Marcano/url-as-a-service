import { Pool } from 'pg'
import { ConfigService } from '../config/main.config'

class Database {
  private static pool: Pool

  private constructor() {}

  static getInstance(): Pool {
    if (!Database.pool) {
      const config = new ConfigService()

      Database.pool = new Pool({
        connectionString: config.getDatabaseUrl(),
        ssl: config.isProduction() ? { rejectUnauthorized: false } : undefined,
      })
    }

    return Database.pool
  }
}

export const db = Database.getInstance()
