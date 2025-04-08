import express, { Application } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import { passport } from '../config/passport.config'

export function setupMiddlewares(app: Application) {
  app.use(helmet())
  app.use(express.json({ limit: '10mb' }))
  app.use(express.urlencoded({ limit: '10mb', extended: true }))
  app.use(morgan('dev'))
  app.use(passport.initialize())
}
