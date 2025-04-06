import fs from 'fs'
import path from 'path'
import { Pool } from 'pg'

export async function runSqlFile(pool: Pool, filePath: string): Promise<void> {
  const sql = fs.readFileSync(path.resolve(filePath), 'utf-8')

  await pool.query(sql)
}
