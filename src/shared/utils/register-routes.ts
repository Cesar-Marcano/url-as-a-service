import {
  HydratedRequest,
  HydratedResponse,
} from '@shared/interfaces/controller.interface'
import { Router, Request, Response, NextFunction } from 'express'

interface RouteConfig {
  method: 'get' | 'post' | 'put' | 'delete'
  path: string
  handler: (
    req: HydratedRequest | Request,
    res: HydratedResponse | Response,
    next: NextFunction,
  ) => void
  middlewares?: any[]
}

export const registerRoutes = (router: Router, routes: RouteConfig[]) => {
  routes.forEach((route) => {
    const { method, path, handler, middlewares } = route

    if (middlewares) {
      router[method](path, ...middlewares, handler)
    } else {
      router[method](path, handler)
    }
  })
}
