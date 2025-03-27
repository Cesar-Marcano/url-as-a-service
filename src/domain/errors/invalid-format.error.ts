export class InvalidFormatError extends Error {
  constructor(public readonly paramterName: string) {
    super(`Invalid format for ${paramterName}`)
  }
}
