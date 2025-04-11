import { BaseError } from '@shared/utils/base-error'

export class PaginationValueError extends BaseError {
  constructor(message: string) {
    super({
      name: PaginationValueError.name,
      message: message,
      statusCode: 400,
      metadata: {},
    })
  }
}
