import { BaseError } from '@shared/utils/base-error'

export class DuplicateKeyError extends BaseError {
  constructor(key: string) {
    super({
      message: `Duplicate key error: ${key}`,
      statusCode: 409,
      name: 'DuplicateKeyError',
    })
  }
}
