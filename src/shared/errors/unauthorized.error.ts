import { BaseError } from '../utils/base-error'

export class UnauthorizedErrorException extends BaseError {
  constructor(customMessage?: string) {
    super({
      name: 'UnauthorizedErrorException',
      message: customMessage ?? 'Unauthorized',
      statusCode: 401,
      genericErrorMessage: 'Unauthorized',
    })
  }
}
