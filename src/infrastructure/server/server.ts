import express from 'express'
import { setupMiddlewares } from './middlewares'
import { setupRouter } from './router'
import { logger } from '../../shared/utils/logger'

export class Server {
  private readonly app = express()

  constructor() {
    setupMiddlewares(this.app)

    // TODO: Setup filters
    
    setupRouter(this.app)
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      logger.info(`Server is running on port ${port}`)
    })
  }
}
