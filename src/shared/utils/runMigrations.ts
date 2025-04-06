import fs from 'fs'
import path from 'path'
import { Pool } from 'pg'
import { createSqlRunner, SqlRunnerScope } from './createSqlRunner'
import { checkMigration } from './checkMigration'

export async function runMigrations(pool: Pool): Promise<void> {
  const resolvedDir = path.resolve(
    process.cwd(),
    'src/infrastructure/database/migrations/',
  )

  if (!fs.existsSync(resolvedDir)) {
    throw new Error(`Migrations directory not found: ${resolvedDir}`)
  }

  const files = fs
    .readdirSync(resolvedDir)
    .filter((file) => file.endsWith('.sql'))
    .sort()

  console.log(`🚀 Running ${files.length} migrations from: ${resolvedDir}`)

  for (const file of files) {
    const isMigrationAlreadyApplied = await checkMigration(pool, file)
    if (isMigrationAlreadyApplied) {
      console.log(`✅ Migration already applied: ${file}`)
      continue
    }

    const runner = createSqlRunner(file, SqlRunnerScope.Migrations)

    console.log(`📦 Running migration: ${file}`)
    await runner(pool)

    await pool.query(
      'INSERT INTO migrations (name) VALUES ($1)',
      [file],
    )
    console.log(`✅ Migration completed: ${file}`)
  }

  console.log('✅ All migrations completed.')
}
