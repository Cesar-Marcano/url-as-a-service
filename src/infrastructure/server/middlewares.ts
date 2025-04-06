import express, { Application } from 'express'

export function setupMiddlewares(app: Application) {
  app.use(express.json({ limit: '10mb' }))
  app.use(express.urlencoded({ limit: '10mb', extended: true }))
}
