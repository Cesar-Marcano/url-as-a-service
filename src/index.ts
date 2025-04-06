import './infrastructure/config/env.config'
import express from 'express'
import { runMigrations } from './shared/utils/runMigrations'
import { db } from './infrastructure/database/database.instance'

const app = express()

async function bootstrap() {
  await runMigrations(db, 'src/infrastructure/database/migrations')

  app.listen(3000, () => {
    console.log('App listening on port 3000')
  })
}

void bootstrap()
