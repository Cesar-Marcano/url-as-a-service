import './infrastructure/config/env.config'

import { runMigrations } from './shared/utils/runMigrations'
import { db } from './infrastructure/database/database.instance'
import { Server } from './infrastructure/server/server'
import { ConfigService } from './infrastructure/config/main.config'

async function bootstrap() {
  await runMigrations(db)

  const configService = new ConfigService()

  new Server(configService).start(configService.getPort())
}

void bootstrap()
