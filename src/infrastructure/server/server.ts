import express from 'express'
import { setupMiddlewares } from './middlewares'

export class Server {
  private readonly app = express()

  constructor() {
    setupMiddlewares(this.app)
    
    // Setup filters
    // Setup router
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  }
}
