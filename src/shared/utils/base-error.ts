export class BaseError extends Error {
  public readonly statusCode: number
  public readonly metadata?: unknown | undefined
  public readonly genericErrorMessage: string | undefined

  constructor({
    name,
    message,
    statusCode = 500,
    metadata,
    cause,
    genericErrorMessage,
  }: {
    name: string
    message: string
    statusCode?: number
    metadata?: unknown
    cause?: Error
    genericErrorMessage?: string
  }) {
    super(message)

    this.name = name
    this.statusCode = statusCode
    this.metadata = metadata
    this.genericErrorMessage = genericErrorMessage

    if (cause) {
      ;(this as any).cause = cause
    }

    if (process.env['NODE_ENV'] !== 'production') {
      Error.captureStackTrace(this, this.constructor)
    }
  }

  toJSON() {
    const errorResponse: Record<string, unknown> = {
      error: this.name,
      message: this.genericErrorMessage ?? this.message,
      statusCode: this.statusCode,
    }

    if (process.env['NODE_ENV'] !== 'production') {
      if (this.metadata) errorResponse['metadata'] = this.metadata
      if (this.cause) errorResponse['cause'] = (this.cause as Error).message
      if (this.stack) errorResponse['stack'] = this.stack
    }

    return errorResponse
  }
}
