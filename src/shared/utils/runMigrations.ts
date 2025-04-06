import fs from 'fs'
import path from 'path'
import { Pool } from 'pg'
import { createSqlRunner } from './createSqlRunner'
import { cwd } from 'process'

export async function runMigrations(
  pool: Pool,
  migrationsDir: string,
  basePath?: string
): Promise<void> {
  const files = fs
    .readdirSync(path.resolve(basePath ?? cwd(), migrationsDir))
    .filter((file) => file.endsWith('.sql'))
    .sort()

  for (const file of files) {
    const fullPath = path.join(migrationsDir, file)

    const runner = createSqlRunner(fullPath)

    await runner(pool)
  }
}
