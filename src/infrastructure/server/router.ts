import { Application, Router } from 'express'
import fs from 'fs'
import path from 'path'

export function setupRouter(app: Application) {
  const router = Router()

  const routesDir = path.join(__dirname, 'routes')

  fs.readdirSync(routesDir).forEach(async (file) => {
    if (file.endsWith('.route.ts')) {
      const route = await import(path.join(routesDir, file))

      if (route.setupRoute) {
        route.setupRoute(router)
      }
    }
  })

  app.use('/api', router)
}
