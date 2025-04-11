import { Controller } from '@shared/interfaces/controller.interface'
import { Router } from 'express'

interface RouteConfig {
  method: 'get' | 'post' | 'put' | 'delete'
  path: string
  controller: Controller<any>
  middlewares?: any[]
}

export const registerRoutes = (router: Router, routes: RouteConfig[]) => {
  routes.forEach((route) => {
    const { method, path, controller, middlewares } = route

    if (middlewares) {
      router[method](path, ...middlewares, (req, res, next) => {
        controller.handle({ req, res, next })
      })
    } else {
      router[method](path, (req, res, next) => {
        controller.handle({ req, res, next })
      })
    }
  })
}
