export class MaxUrlsExceededError extends Error {
  constructor() {
    super('Maximum number of URLs reached.')
    this.name = 'MaxUrlsExceededError'
  }
}
