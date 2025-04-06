import './infrastructure/config/env.config'

import { runMigrations } from './shared/utils/runMigrations'
import { db } from './infrastructure/database/database.instance'
import { Server } from './infrastructure/server/server'

async function bootstrap() {
  await runMigrations(db)

  new Server().start(3000)
}

void bootstrap()
