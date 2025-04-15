import { Request, Response, NextFunction } from 'express'
import { BaseError } from '@shared/utils/base-error'
import { ConfigService } from '@infra/config/main.config'

export const errorHandler =
  (configService: ConfigService) =>
  (
    err: Error | BaseError,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    if (err instanceof BaseError) {
      const statusCode = err.statusCode || 500
      const errorResponse = err.toJSON()

      if (configService.isProduction()) {
        delete errorResponse['stack']
        delete errorResponse['cause']
        delete errorResponse['metadata']
      }

      res.status(statusCode).json(errorResponse)
      return
    }

    const genericError: Record<string, any> = {
      error: 'InternalServerError',
      message: 'Something went wrong, please try again later.',
      statusCode: 500,
    }

    if (!configService.isProduction()) {
      genericError['stack'] = err.stack
      console.error(err)
    }
    res.status(500).json(genericError)
    return
  }
