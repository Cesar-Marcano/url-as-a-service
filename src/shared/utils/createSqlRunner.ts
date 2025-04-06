import fs from 'fs'
import path from 'path'
import { Pool } from 'pg'

export enum SqlRunnerScope {
  Queries = 'queries',
  Migrations = 'migrations',
}

export function createSqlRunner(filePath: string, scope = SqlRunnerScope.Queries) {
  const absolutePath = path.resolve(process.cwd(), 'src/infrastructure/database', scope, filePath)

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`SQL file not found: ${absolutePath}`)
  }

  const sql = fs.readFileSync(absolutePath, 'utf-8')

  return async function run(pool: Pool, params: any[] = []): Promise<void> {
    try {
      await pool.query(sql, params)
    } catch (error) {
      console.error(`❌ Error executing SQL from ${filePath}`)
      throw error
    }
  }
}
