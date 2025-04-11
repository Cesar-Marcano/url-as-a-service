import { BaseError } from '@shared/utils/base-error'

export enum NotFoundErrorExceptionScope {
  DATABASE = 'DATABASE',
  API = 'API',
}

export class NotFoundErrorException extends BaseError {
  constructor(scope: NotFoundErrorExceptionScope, resource: string) {
    const message = `Resource ${resource} not found in ${scope}`
    const metadata = { scope, resource }

    super({
      name: 'NotFoundErrorException',
      message,
      statusCode: 404,
      metadata,
      genericErrorMessage: 'Resource not found',
    })
  }
}
