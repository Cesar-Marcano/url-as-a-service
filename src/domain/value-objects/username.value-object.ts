import { InvalidFormatError } from '@shared/errors/invalid-format.error'

export class Username {
  private readonly username: string

  constructor(username: string) {
    if (!this.isValidUsername(username)) {
      throw new InvalidFormatError('username')
    }
    this.username = username
  }

  private isValidUsername(username: string): boolean {
    const regex = /^[a-zA-Z0-9._-]{6,20}$/
    return regex.test(username)
  }

  public toString(): string {
    return this.username
  }

  public equals(other: Username): boolean {
    return this.username === other.toString()
  }
}
