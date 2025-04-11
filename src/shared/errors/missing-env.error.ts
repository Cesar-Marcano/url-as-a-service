import { BaseError } from '@shared/utils/base-error'

export class MissingEnvError extends BaseError {
  constructor(env: string) {
    super({
      message: `Missing environment variable: ${env}`,
      statusCode: 500,
      name: MissingEnvError.name,
      genericErrorMessage: 'Internal server error.',
    })
  }
}
