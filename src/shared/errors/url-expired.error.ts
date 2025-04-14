import { BaseError } from '@shared/utils/base-error'

export class UrlExpiredException extends BaseError {
  constructor(slug?: string) {
    const message = slug ? `Url with slug "${slug}" has expired.` : `Url expired.`;

    super({
      name: UrlExpiredException.name,
      message,
      statusCode: 410,
      genericErrorMessage: 'Resource gone',
    })
  }
}
