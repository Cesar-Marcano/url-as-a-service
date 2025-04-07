import express from 'express'
import { setupMiddlewares } from './middlewares'
import { setupRouter } from './router'
import { logger } from '../../shared/utils/logger'
import { errorHandler } from './middlewares/error.filter'
import { ConfigService } from '../config/main.config'

export class Server {
  private readonly app = express()

  constructor(private readonly configService: ConfigService) {
    setupMiddlewares(this.app)

    setupRouter(this.app)

    this.app.use(errorHandler(this.configService))
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      logger.info(`Server is running on port ${port}`)
    })
  }
}
