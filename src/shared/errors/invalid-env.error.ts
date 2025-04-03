import { BaseError } from '../utils/base-error'

export class InvalidEnvError extends BaseError {
  constructor(message: string) {
    super({
      message: `Invalid environment variable: ${message}`,
      statusCode: 500,
      name: InvalidEnvError.name,
      genericErrorMessage: 'Internal server error.',
    })
  }
}
