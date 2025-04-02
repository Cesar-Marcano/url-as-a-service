import { BaseError } from '../utils/base-error'

export class InvalidFormatError extends BaseError {
  constructor(
    public readonly parameterName: string,
    public readonly parameterValue?: unknown,
  ) {
    super({
      name: InvalidFormatError.name,
      message: `Invalid format for ${parameterName}`,
      statusCode: 400,
      metadata: {
        parameterName: parameterName,
        parameterValue: parameterValue,
      },
    })
  }
}
