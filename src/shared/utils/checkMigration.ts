import { Pool } from 'pg'

export async function checkMigration(
  pool: Pool,
  migrationName: string,
): Promise<boolean> {
  try {
    const result = await pool.query(
      'SELECT 1 FROM migrations WHERE name = $1 LIMIT 1',
      [migrationName],
    )
    return result.rowCount! > 0
  } catch (error) {
    console.error(`❌ Error checking migration: ${migrationName}`, error)
    throw error
  }
}
