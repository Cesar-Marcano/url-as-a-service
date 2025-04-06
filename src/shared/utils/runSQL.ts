import fs from 'fs'
import path from 'path'
import { Pool } from 'pg'

export function createSqlRunner(filePath: string) {
  const sql = fs.readFileSync(path.resolve(filePath), 'utf-8')

  return async function run(pool: Pool, params: any[] = []): Promise<void> {
    await pool.query(sql, params)
  }
}
