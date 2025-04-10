import 'module-alias/register';
import '@infra/config/env.config'

import { runMigrations } from '@shared/utils/runMigrations'
import { db } from '@infra/database/database.instance'
import { Server } from '@infra/server/server'
import { ConfigService } from '@infra/config/main.config'

async function bootstrap() {
  await runMigrations(db)

  const configService = new ConfigService()

  new Server(configService).start(configService.getPort())
}

void bootstrap()
