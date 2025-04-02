import { BaseError } from '../utils/base-error'

export class WeakPasswordError extends BaseError {
  constructor() {
    super({
      name: WeakPasswordError.name,
      message:
        'The password must be at least 8 characters long; contain at least one uppercase letter, one lowercase letter, one symbol and one number',
      statusCode: 400,
      genericErrorMessage:
        'The provided password does not meet the required strength criteria.',
    })
  }
}
