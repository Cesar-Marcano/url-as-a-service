import fs from 'fs'
import path from 'path'
import { Pool } from 'pg'
import { createSqlRunner, SqlRunnerScope } from './createSqlRunner'
import { checkMigration } from './checkMigration'
import { logger } from './logger'

export async function runMigrations(pool: Pool): Promise<void> {
  const createMigrationsTable = createSqlRunner(
    '0001_create_migrations_table.sql',
    SqlRunnerScope.Migrations,
  )

  await createMigrationsTable(pool)

  const resolvedDir = path.resolve(
    __dirname,
    '../../infrastructure/database/migrations/',
  )

  if (!fs.existsSync(resolvedDir)) {
    throw new Error(`Migrations directory not found: ${resolvedDir}`)
  }

  const files = fs
    .readdirSync(resolvedDir)
    .filter((file) => file.endsWith('.sql'))
    .sort()

  logger.info(`🚀 Running ${files.length} migrations from: ${resolvedDir}`)

  for (const file of files) {
    const isMigrationAlreadyApplied = await checkMigration(pool, file)
    if (isMigrationAlreadyApplied) {
      logger.info(`✅ Migration already applied: ${file}`)
      continue
    }

    const runner = createSqlRunner(file, SqlRunnerScope.Migrations)

    logger.info(`📦 Running migration: ${file}`)
    await runner(pool)

    await pool.query('INSERT INTO migrations (name) VALUES ($1)', [file])
    logger.info(`✅ Migration completed: ${file}`)
  }

  logger.info('✅ All migrations completed.')
}
