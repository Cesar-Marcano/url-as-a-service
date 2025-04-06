import fs from 'fs'
import path from 'path'
import { Pool } from 'pg'
import { createSqlRunner } from './createSqlRunner'

export async function runMigrations(
  pool: Pool,
  migrationsDir: string,
): Promise<void> {
  const files = fs
    .readdirSync(path.resolve(__dirname, migrationsDir))
    .filter((file) => file.endsWith('.sql'))
    .sort()

  for (const file of files) {
    const fullPath = path.join(migrationsDir, file)

    const runner = createSqlRunner(fullPath)

    await runner(pool)
  }
}
